import { Typography, Card, Box, Chip } from '@mui/joy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const EntryCard = ({ entry }: any) => {
  const dateObj = new Date(entry.createdAt)
  const date = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const time = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%',
        p: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
          borderColor: 'primary.lightBg',
        },
        borderRadius: 'xl',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: 'background.surface'
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography level="body-xs" fontWeight="bold" sx={{ color: 'primary.solidBg', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {date}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.tertiary' }}>
            <AccessTimeIcon sx={{ fontSize: '0.875rem' }} />
            <Typography level="body-xs" fontWeight="md">
              {time}
            </Typography>
          </Box>
        </Box>

        <Typography 
          level="title-lg" 
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            mb: 2,
            minHeight: '4.2em'
          }}
        >
          {entry?.analysis?.summary || 'No summary available'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
        <Chip 
          variant="soft" 
          color="primary" 
          size="sm"
          sx={{ 
            fontWeight: 'md',
            bgcolor: 'primary.lightBg',
            color: 'primary.solidBg'
          }}
        >
          {entry?.analysis?.mood || 'Neutral'}
        </Chip>
      </Box>
    </Card>
  )
}

export default EntryCard