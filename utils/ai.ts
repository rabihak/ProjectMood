import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts";
import z from "zod"
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HumanMessage } from "@langchain/core/messages";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
    mood: z.string().describe("the mood of the person who wrote the journal entry, per example mood can be neutral or positive or negative."),
    summary: z.string().describe("quick summary of the entire entry."),
    subject: z.string().describe('the subject of the journal entry, DONT RETURN NULL AS A VALUE NO MATTER WHAT!.'),
    negative: z.boolean().describe(
      'is the journal entry negative? (i.e. does it contain negative emotions?).'
    ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry, Example #0101fe , choose a fitting color for the mood, choose a color that is fitting as a background color to a black text color.'
      ),
  })
)

const OPENROUTER_BASE_URL ="https://openrouter.ai"

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions. Do not return null for any value. \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (content: string) => {
  const input = await getPrompt(content)
  const model = new ChatOpenAI(
    {
      modelName: "google/gemini-3.1-flash-lite-preview",
      temperature: 0.5,
      maxTokens: 300,
      streaming: true,
      openAIApiKey: process.env.OPENAI_API_KEY,
    },
    {
      basePath: `${OPENROUTER_BASE_URL}/api/v1`,
    }
    );
  
  const result = await model.invoke(input)
  
  try {
    const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
    return parser.parse(content)
  } catch (e) {
    console.error("Analysis parsing error:", e)
    return {
      sentimentScore: 0,
      mood: "Neutral",
      summary: "Could not analyze entry.",
      subject: "Journal Entry",
      negative: false,
      color: "#f4f4f5",
    }
  }
}

export const qa = async (question: string, entries: any[]) => {
  if (!entries || entries.length === 0) {
    return "You don't have any journal entries yet. Start writing to ask me questions about your journey!"
  }

  try {
    const docs = entries.map((entry) => {
      return new Document({
        pageContent: entry.content,
        metadata: { id: entry.id, createdAt: entry.createdAt }
      })
    })

    const model = new ChatOpenAI(
      {
        modelName: "google/gemini-3.1-flash-lite-preview",
        temperature: 0.5,
        maxTokens: 300,
        openAIApiKey: process.env.OPENAI_API_KEY,
      },
      {
        basePath: `${OPENROUTER_BASE_URL}/api/v1`,
      }
    );

    let relevantDocs = docs;
    try {
      const embeddings = new OpenAIEmbeddings(
        {
          modelName: "openai/text-embedding-3-small",
          openAIApiKey: process.env.OPENAI_API_KEY,
        },
        {
          basePath: `${OPENROUTER_BASE_URL}/api/v1`,
        }
      )
      
      const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
      relevantDocs = await store.similaritySearch(question, 4)
    } catch (embError) {
      console.error("Embedding error, falling back to recent entries:", embError)
      relevantDocs = docs.slice(0, 5); 
    }
    
    const context = relevantDocs.map(d => d.pageContent).join("\n---\n")
    
    const prompt = `You are a helpful assistant analyzing a user's journal. Use the following journal entries to answer the user's question.
    
    Context:
    ${context}
    
    Question: ${question}
    
    Answer the question based ONLY on the provided context. If the answer is not in the journal entries, say you don't know. Be concise and empathetic.`

    const res = await model.invoke([new HumanMessage(prompt)])
    
    return res.content as string
  } catch (error: any) {
    console.error("QA Error:", error)
    return `Error: ${error?.message || "I'm having trouble searching through your journal entries right now."}`
  }
}