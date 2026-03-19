import Header from "@/components/Header"
import { Box } from '@mui/joy'

function DashBoardLayout({ children } : any) {

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.body' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, position: 'relative', bgcolor: 'background.body' }}>
        {children}
      </Box>
    </Box>
  )
}

export default DashBoardLayout