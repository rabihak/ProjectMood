import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { JournalEntry } from "@prisma/client"
const getEntry = async (id :any) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    },
    include: {
      analysis: true
    }
  })

  return entry
}

const EntryPage = async ({ params } :any ) => {
  const entry = await getEntry(params.id) as JournalEntry
  return <div className="h-full w-full">
    <Editor entry={entry} />
  </div>
}
export default EntryPage