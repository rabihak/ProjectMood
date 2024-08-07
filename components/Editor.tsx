'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"
import Spinner from './Spinner';

interface analysisint {
  id: string
  createdAt: Date
  updatedAt: Date
  entryId: string
  mood: string
  summary: string
  color: string
  negative: boolean
  subject: string;
  sentimentScore: number
  userId: number
}
const Editor = ({ entry }: any) => {
  console.log("entry", entry)
  const [value, setValue] = useState(entry?.content)
  const [isLoading, setIsloading] = useState(false)
  const [analysis, setAnalysis] = useState<analysisint>(entry?.analysis)
  const { mood, summary, color, subject, negative } = analysis ?? {}
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? 'True' : 'False' },
  ]
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsloading(true)
      const data = await updateEntry(entry?.id, _value)
      setAnalysis(data?.analysis)
      setIsloading(false)
    }
  })
  return (
    
    <div className=" w-full h-full grid grid-cols-1  relative">
      <div className="absolute left-0 top-0 p-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea className="w-full h-full p-8 text-xl outline-none " maxLength={1000} value={value} onChange={e => setValue(e.target.value)} />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>)
}

export default Editor 