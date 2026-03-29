'use client'

import { updateEntry, deleteEntry, transcribeAudio } from "@/utils/api"
import React, { useState, useEffect, useRef } from "react"
import { useAutosave } from "react-autosave"
import Spinner from './Spinner';
import { 
  Box, Typography, Card, Divider, List, ListItem, ListItemContent, Chip, Button,
  Modal, ModalDialog, DialogTitle, DialogContent, Stack, IconButton, Tooltip,
  Snackbar, CircularProgress
} from '@mui/joy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import MicIcon from '@mui/icons-material/Mic';
import SquareIcon from '@mui/icons-material/Square';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useRouter } from "next/navigation"

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
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [analysis, setAnalysis] = useState<analysisint>(entry?.analysis)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const router = useRouter()
  
  const { mood, summary, color, subject, negative } = analysis ?? {}
  
  const analysisData = [
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? 'Yes' : 'No', color: negative ? 'danger' : 'success' },
  ]

  const startRecording = async () => {
    setSpeechError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setIsTranscribing(true)
        try {
          const result = await transcribeAudio(audioBlob)
          if (result?.text) {
            setValue((prev: string) => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + result.text)
          } else if (result?.error) {
            setSpeechError(result.error)
          }
        } catch (error) {
          setSpeechError("Transcription failed. Please check your connection.")
        } finally {
          setIsTranscribing(false)
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop())
        }
      }

      recorder.start()
      setIsRecording(true)
    } catch (error: any) {
      console.error("Mic access error:", error)
      if (error.name === 'NotAllowedError') {
        setSpeechError("Microphone access denied.")
      } else {
        setSpeechError("Could not access microphone.")
      }
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

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

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteEntry(entry.id)
      router.push('/journal')
      router.refresh()
    } catch (error) {
      console.error("Delete failed:", error)
      setIsDeleting(false)
      setOpen(false)
    }
  }

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
          gap: 2,
          zIndex: 10,
          bgcolor: 'background.surface',
          opacity: 0.9,
          p: 1,
          borderRadius: 'lg',
          backdropFilter: 'blur(4px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'sm'
        }}>
          <Tooltip title={isRecording ? "Stop Recording" : "Start Voice-to-Text"} variant="soft">
            <IconButton 
              variant={isRecording ? "solid" : "soft"} 
              color={isRecording ? "danger" : "primary"}
              onClick={toggleRecording}
              disabled={isTranscribing}
              sx={{ 
                borderRadius: 'full',
                animation: isRecording ? 'pulse 1.5s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(225, 29, 72, 0.4)' },
                  '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(225, 29, 72, 0)' },
                  '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(225, 29, 72, 0)' },
                }
              }}
            >
              {isTranscribing ? <CircularProgress size="sm" thickness={2} /> : (isRecording ? <SquareIcon sx={{ fontSize: '1.2rem' }} /> : <MicIcon />)}
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" />

          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
              <Spinner />
              <Typography level="body-xs" fontWeight="bold">Saving...</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.solidBg', px: 1 }}>
              <CheckCircleIcon sx={{ fontSize: '1.2rem' }} />
              <Typography level="body-xs" color="success" fontWeight="bold">Saved</Typography>
            </Box>
          )}
        </Box>
        
        <textarea 
          className="w-full h-full text-lg sm:text-xl outline-none resize-none bg-transparent dark:text-white transition-colors duration-300"
          placeholder={isRecording ? "Listening... click again to finish." : (isTranscribing ? "AI is transcribing your audio..." : "Start writing your thoughts...")}
          value={value} 
          onChange={e => setValue(e.target.value)} 
          style={{ fontFamily: 'inherit', lineHeight: 1.6, paddingTop: '40px' }}
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
          
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="soft" 
              color="danger" 
              startDecorator={<DeleteIcon />}
              fullWidth
              onClick={() => setOpen(true)}
            >
              Delete Entry
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirm Deletion
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this journal entry? This action cannot be undone.
          </DialogContent>
          <Stack direction="row-reverse" spacing={1}>
            <Button variant="solid" color="danger" onClick={handleDelete} loading={isDeleting}>
              Delete entry
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>

      <Snackbar
        variant="soft"
        color="danger"
        open={!!speechError}
        onClose={() => setSpeechError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        startDecorator={<InfoOutlinedIcon />}
        endDecorator={
          <Button
            onClick={() => setSpeechError(null)}
            size="sm"
            variant="soft"
            color="danger"
          >
            Dismiss
          </Button>
        }
      >
        {speechError}
      </Snackbar>
    </Box>
  )
}

export default Editor