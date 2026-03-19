"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import EntryCard from './EntryCard'
import { Box, CircularProgress } from '@mui/joy'

const EntryCardContainer = ({ entries }: any) => {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  
  const handleOnClick = (entryId: string) => {
    setLoadingId(entryId)
  }

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {entries.map((entry: any) => (
          <Link 
            href={`/journal/${entry.id}`} 
            key={entry.id} 
            onClick={() => handleOnClick(entry.id)} 
            className="relative block"
          >
            <EntryCard entry={entry} />
            {loadingId === entry.id && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: 'xl',
                  zIndex: 10,
                  backdropFilter: 'blur(2px)'
                }}
              >
                <CircularProgress 
                  sx={{ 
                    "--CircularProgress-size": "60px",
                    "--CircularProgress-trackThickness": "6px",
                    "--CircularProgress-progressThickness": "4px",
                    color: 'primary.solidBg'
                  }} 
                />
              </Box>
            )}
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default EntryCardContainer
