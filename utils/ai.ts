
import { ChatOpenAI, OpenAI } from "@langchain/openai";

import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts";
import z from "zod"
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
    mood: z.string().describe("the mood of the person who wrote the journal entry, per example mood can be neutral or positive or negative."),
    summary: z.string().describe("quick summary of the entire entry."),
    subject: z.string().describe('the subject of the journal entry,DONT RETURN NULL AS A VALUE NO MATTER WHAT!.'),
    negative: z.boolean().describe(
      'is the journal entry negative? (i.e. does it contain negative emotions?).'
    ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry, Example #0101fe , choose a fitting color for the mood, choose a color that is fitting as a backgroun Color to a black Text color.'
      ),
  })
)

const OPENROUTER_BASE_URL ="https://openrouter.ai"
const getPrompt = async (content: any) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions,Dont return null to any of the value ALWAYS FILL THEM, no matter what! \n{format_instructions}\n{entry},elliminate ; from the message response',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },

  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}
export const analyze = async (content: any) => {
  const input = await getPrompt(content)
  const model = new ChatOpenAI(
    {
      modelName: "openai/gpt-4o-mini",
      temperature: 0.8,
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
    return parser.parse(result.content as string)
  } catch (e) {
    console.log(e)
  }
  console.log(result)
}

export const qa = async (question: any, entries: any) => {
  const docs = entries.map((entry: any) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt }
    })
  })
  const model = new ChatOpenAI(
    {
      modelName: "openai/gpt-4o-mini",
      temperature: 0.8,
      maxTokens: 300,
      streaming: true,
      openAIApiKey: process.env.OPENAI_API_KEY,
    },
    {
      basePath: `${OPENROUTER_BASE_URL}/api/v1`,
    }
    );
  const chain = loadQARefineChain(model)
  const embeddings = new GoogleGenerativeAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })
  return res.output_text
}