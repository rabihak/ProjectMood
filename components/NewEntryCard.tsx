'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CircularProgress } from "@mui/joy";
import { useState } from "react";

const NewEntryCard = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleOnClick = async () => {
    setLoading(true)
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
    setLoading(false)
  }
  return <div className="cursor-pointer overflow-hidden rounded-lg h-50 bg-white shadow">
    <div className="px-4 py-5 sm:p-6 w-full flex " onClick={handleOnClick}>
      <PostAddIcon fontSize="large" className="mb-2" />
      <span className="text-2xl">New Entry</span>
      {loading &&
        <div className="justify-end p-1">
          <CircularProgress
            className="bottom-0"
            sx={{
              "--CircularProgress-size": "25px",
              "--CircularProgress-trackThickness": "4px",
              "--CircularProgress-progressThickness": "3px"
            }} />
        </div>
      }
    </div>
  </div>
}

export default NewEntryCard