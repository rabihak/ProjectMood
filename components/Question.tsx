'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"
import { Input, Button, Box, Typography, Card, CircularProgress } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';

const Question = () => {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (value.trim()) {
      setResponse("")
      setLoading(true)
      try {
        const answer = await askQuestion(value)
        setResponse(answer)
        setValue('')
      } catch (error) {
        setResponse("Sorry, I couldn't process that question right now.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Input
            disabled={loading}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask me anything about your journey..."
            sx={{ flex: 1, borderRadius: 'lg' }}
            size="lg"
            endDecorator={
              <Button 
                type="submit" 
                disabled={loading || !value.trim()}
                variant="solid"
                color="primary"
                sx={{ borderRadius: 'md' }}
              >
                {loading ? <CircularProgress size="sm" variant="plain" sx={{ color: 'white' }} /> : <SendIcon />}
              </Button>
            }
          />
        </Box>
      </form>
      
      {(loading || response) && (
        <Card 
          variant="soft" 
          color="primary"
          sx={{ 
            mt: 2, 
            p: 2, 
            borderRadius: 'lg',
            bgcolor: 'primary.lightBg',
            border: '1px solid',
            borderColor: 'primary.softBg',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          <Typography level="title-sm" sx={{ color: 'primary.solidBg', mb: 0.5, fontWeight: 'bold' }}>
            AI Assistant
          </Typography>
          <Typography level="body-md">
            {loading ? "Thinking..." : response}
          </Typography>
        </Card>
      )}
    </Box>
  )
}

export default Question