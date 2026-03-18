'use client'

import { updateEntry } from "@/utils/api"
import React, { useState } from "react"
import { useAutosave } from "react-autosave"
import Spinner from './Spinner';
import { Box, Typography, Card, Divider, List, ListItem, ListItemContent, Chip } from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  const [value, setValue] = useState(entry?.content)
  const [isLoading, setIsloading] = useState(false)
  const [analysis, setAnalysis] = useState<analysisint>(entry?.analysis)
  
  const { mood, summary, color, subject, negative } = analysis ?? {}
  
  const analysisData = [
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? 'Yes' : 'No', color: negative ? 'danger' : 'success' },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value !== entry?.content) {
        setIsloading(true)
        const data = await updateEntry(entry?.id, _value)
        setAnalysis(data?.analysis)
        setIsloading(false)
      }
    }
  })

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', lg: 'row' },
      minHeight: { xs: 'auto', lg: 'calc(100vh - 64px)' },
      bgcolor: 'background.surface'
    }}>
      <Box sx={{ 
        flex: 1, 
        p: { xs: 3, sm: 4 }, 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: { xs: '500px', lg: 'auto' }
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 24, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          zIndex: 10,
          bgcolor: 'rgba(255,255,255,0.8)',
          p: 0.5,
          borderRadius: 'md',
          backdropFilter: 'blur(4px)'
        }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Spinner />
              <Typography level="body-xs">Saving...</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.solidBg' }}>
              <CheckCircleIcon sx={{ fontSize: '1rem' }} />
              <Typography level="body-xs" color="success">Saved</Typography>
            </Box>
          )}
        </Box>
        
        <textarea 
          className="w-full h-full text-lg sm:text-xl outline-none resize-none bg-transparent"
          placeholder="Start writing your thoughts..."
          value={value} 
          onChange={e => setValue(e.target.value)} 
          style={{ fontFamily: 'inherit', lineHeight: 1.6 }}
        />
      </Box>

      <Box sx={{ 
        width: { xs: '100%', lg: '350px' },
        borderLeft: { lg: '1px solid' },
        borderTop: { xs: '1px solid', lg: 'none' },
        borderColor: 'divider',
        bgcolor: 'neutral.lightBg',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ p: 3, bgcolor: color || 'primary.solidBg', color: color ? 'black' : 'white' }}>
          <Typography level="h4" fontWeight="bold" textColor="inherit">
            Analysis
          </Typography>
        </Box>

        <Box sx={{ p: 3, flex: 1 }}>
          <Card variant="soft" sx={{ mb: 3, bgcolor: 'background.surface' }}>
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 1 }}>
              Summary
            </Typography>
            <Typography level="body-md" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
              {summary || 'No summary available yet. Start writing to get an AI analysis.'}
            </Typography>
          </Card>

          <List sx={{ '--ListItem-paddingX': '0px' }}>
            {analysisData.map((item, index) => (
              <React.Fragment key={item.name}>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemContent>
                    <Typography level="title-sm" fontWeight="bold">
                      {item.name}
                    </Typography>
                  </ListItemContent>
                  {item.name === 'Negative' ? (
                    <Chip variant="soft" color={item.color as any} size="sm">
                      {item.value}
                    </Chip>
                  ) : (
                    <Typography level="body-sm" textAlign="right">
                      {item.value || 'N/A'}
                    </Typography>
                  )}
                </ListItem>
                {index < analysisData.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Editor 
 