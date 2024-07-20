"use client"

import React, { useState } from 'react'
import NewEntryCard from './NewEntryCard'
import Link from 'next/link'
import EntryCard from './EntryCard'
import { JournalEntry } from '@prisma/client'
import { CircularProgress } from '@mui/joy'

export const EntryCardContainer = ({ entries }: any) => {
  const [loading, setLoading] = useState(false)
  const handleOnClick = async ({ entryId }: any) => {
    setLoading(entryId)
  }
  return (
    <div>
      <NewEntryCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  mt-4 gap-4 overflow-auto max-h-[45vh] ">
        {entries.map((entry: any) =>
          <Link href={`/journal/${entry.id}`} key={entry.id} onClick={() => handleOnClick(entry.id)} className='relative h-42 gap-1'>
            <EntryCard entry={entry} />
            {loading === entry.id &&
              <div className="p-1 absolute top-[30%] left-[30%]">
                <CircularProgress
                  className="bottom-0"
                  sx={{
                    "--CircularProgress-size": "100px",
                    "--CircularProgress-trackThickness": "10px",
                    "--CircularProgress-progressThickness": "5px"
                  }} />
              </div>
            }
          </Link>
        )}
      </div>
    </div>
  )
}
