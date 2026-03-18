import Header from "@/components/Header"
import Box from '@mui/joy/Box'

function DashBoardLayout({ children } : any) {

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, position: 'relative' }}>
        {children}
      </Box>
    </Box>
  )
}

export default DashBoardLayout