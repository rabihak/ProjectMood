import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async()=>{
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where:{
      userId:user.id,
    },
    orderBy:{
      createdAt:'asc'
    }
  })
  const sum = analyses.reduce((all,current)=>all + current.sentimentScore ,0)
  const avg = Math.round(sum/analyses.length)
  return {analyses,avg}
}

const History= async ()=>{
  const  {analyses,avg} = await getData()
  
    return <div className="w-full h-full"> 
          <div className="w-full h-full flex justify-center items-center flex-col ">
          <div className="w-full px-6 py-2 text-2xl mt-5 text-center">{`Average Mood Score : ${avg}`}</div>
          <hr className="flex w-[100%] mt-2 mb-2 h-[1px] border-black"/>
          <HistoryChart data={analyses}></HistoryChart>
          </div>
       </div> 
}

export default History