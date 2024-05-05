import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async ()=>{
  const user = await getUserByClerkId() 
  console.log("user",user);
  
  const entry = await prisma.journalEntry.create({
    data:{
      userId : user.id,
      content:"Write about your day!"
    }
  })

  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data:{
      entryId: entry.id,
      mood: analysis?.mood as string,
      summary: analysis?.summary as string,
      subject: analysis?.subject as string,
      negative: analysis?.negative as boolean,
      color: analysis?.color as string,
    }
  })

  revalidatePath('/journal')
  return NextResponse.json({data:entry})
}