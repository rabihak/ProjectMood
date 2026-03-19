'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CircularProgress, Card, Typography, Box } from "@mui/joy";
import { useState } from "react";

const NewEntryCard = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const handleOnClick = async () => {
    if (loading) return
    setLoading(true)
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <Card 
      onClick={handleOnClick}
      variant="solid" 
      color="primary"
      sx={{ 
        cursor: 'pointer',
        mb: 4,
        p: 2,
        borderRadius: 'xl',
        boxShadow: 'md',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
          bgcolor: 'primary.solidHoverBg',
        },
        maxWidth: { xs: '100%', sm: '280px' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <PostAddIcon sx={{ fontSize: '2rem' }} />
        <Typography level="title-lg" textColor="inherit" fontWeight="bold">
          New Entry
        </Typography>
        {loading && (
          <CircularProgress
            variant="plain"
            sx={{
              ml: 'auto',
              color: 'inherit',
              "--CircularProgress-size": "24px",
              "--CircularProgress-trackThickness": "3px",
              "--CircularProgress-progressThickness": "3px"
            }} 
          />
        )}
      </Box>
    </Card>
  )
}

export default NewEntryCard