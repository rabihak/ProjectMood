'use client'

import { Modal, ModalDialog, CircularProgress, Typography, Stack } from '@mui/joy'

const LoadingModal = () => {
  return (
    <Modal open={true}>
      <ModalDialog
        variant="plain"
        sx={{
          bgcolor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress 
            size="lg" 
            variant="solid" 
            color="primary"
            sx={{ 
              '--CircularProgress-size': '64px',
              '--CircularProgress-trackThickness': '6px',
              '--CircularProgress-progressThickness': '6px'
            }}
          />
          <Typography 
            level="title-lg" 
            sx={{ 
              color: 'white', 
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontWeight: 'bold'
            }}
          >
            Loading...
          </Typography>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default LoadingModal
