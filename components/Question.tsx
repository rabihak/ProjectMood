'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")

  const onChange = (e: any) => {
    e.preventDefault()
    setValue(e.target.value)
  }
  const handleSubmit = async (e: any) => {
    if (value.trim()) {
      e.preventDefault()
      setResponse("")
      setLoading(true)
      const answer = await askQuestion(value)
      setResponse(answer)
      setValue('')
      setLoading(false)
    }

  }
  return <>
    <div className="w-full h-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <input disabled={loading} value={value} onChange={onChange} type="text" placeholder="Ask me about your day!" className="capitalize border w-full border-black/20 px-4 py-2 text-lg rounded-lg " />
        <div className="flex content-center justify-end mt-4">
          <button disabled={loading || !value} type="submit" className="bg-sky-400 text-white hover:cursor-pointer disabled:opacity-50 px-4 py-2 w-24 justify-items-end rounded-lg text-lg">Ask</button>
        </div>
      </form>
      {(loading || response) && <div className="p-4 border-2 border-solid mt-3 flex justify-center content-center text-base bg-sky-800 w-full text-white rounded-md max-h-[16vh] overflow-auto ">
        {loading && <div>Thinking...</div>}
        {response && response}
      </div>}
    </div>
  </>
}
export default Question