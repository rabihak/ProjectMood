import { EntryCardContainer } from "@/components/EntryCardContainer"
import Question from "@/components/Question"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: "desc"
    },
    include:{
      analysis:true,
    }
  })
  return entries
}

const JournalPage = async () => {
  const user = await getUserByClerkId()
  const entries = await getEntries()
  return <div className="p-6 bg-zinc-400/10 h-full flex flex-col">
    <div className="max-h-[38%]">
    <h2 className="text-3xl mb-4 capitalize">Welcome, {user.firstName}</h2>
    <div className="my-6 "><Question/></div>
    </div>
    <EntryCardContainer entries={entries}/>
  </div>
}
export default JournalPage