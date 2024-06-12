import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }: any) => {
  const user = await getUserByClerkId()
  const { content } = await request.json()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      content
    }
  })
  const analysis = (await analyze(updatedEntry.content))

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      userId:user.id,
      mood: analysis?.mood as string,
      summary: analysis?.summary as string,
      subject: analysis?.subject as string,
      negative: analysis?.negative as boolean,
      color: analysis?.color as string,
      sentimentScore:analysis?.sentimentScore 
    },
    update: {
      mood: analysis?.mood,
      summary: analysis?.summary,
      subject: analysis?.subject,
      negative: analysis?.negative,
      color: analysis?.color,
      sentimentScore:analysis?.sentimentScore 
    }
  })

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}