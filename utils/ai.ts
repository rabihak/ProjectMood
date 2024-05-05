import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {StructuredOutputParser} from "langchain/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts";
import z from "zod"

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood:z.string().describe("the mood of the person who wrote the journal entry, per example mood can be neutral or positive or negative."),
    summary:z.string().describe("quick summary of the entire entry."),
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


const getPrompt = async (content : any) => {
  const format_instructions = parser.getFormatInstructions()
  
  const prompt = new PromptTemplate({
    template:
    'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions,Dont return null to any of the value ALWAYS FILL THEM, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })
  
  const input = await prompt.format({
    entry: content,
  })
  
  return input
}
export const analyze = async (content : any)=>{
  const input = await getPrompt(content)
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    temperature:0,
  });
  const result = await model.invoke(input)
  
  try{
    return parser.parse(result.content as string)
  }catch(e){
    console.log(e)
  }
  console.log(result)
}