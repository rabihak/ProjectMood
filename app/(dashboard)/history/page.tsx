import { EntryCardContainer } from "@/components/EntryCardContainer";
import HistoryChart from "@/components/HistoryChart"
import HistoryFilter from "@/components/HistoryFilter"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { Box, Typography, Card, Divider } from '@mui/joy';
import { startOfWeek, endOfWeek, subWeeks, subMonths, startOfMonth } from 'date-fns';

const getData = async (range: string) => {
  const user = await getUserByClerkId()
  let where: any = { userId: user.id }
  const now = new Date()

  if (range === 'this-week') {
    where.createdAt = {
      gte: startOfWeek(now),
      lte: endOfWeek(now),
    }
  } else if (range === 'last-week') {
    const lastWeek = subWeeks(now, 1)
    where.createdAt = {
      gte: startOfWeek(lastWeek),
      lte: endOfWeek(lastWeek),
    }
  } else if (range === 'last-month') {
    where.createdAt = {
      gte: startOfMonth(subMonths(now, 1)),
      lte: now,
    }
  }

  const analyses = await prisma.analysis.findMany({
    where,
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      entry: true
    }
  })

  if (analyses.length === 0) return { analyses: [], avg: 0, entries: [] }
  
  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  
  // Prepare entries with their analysis for the EntryCardContainer
  const entries = analyses.map(a => ({
    ...a.entry,
    analysis: {
      mood: a.mood,
      summary: a.summary,
      color: a.color,
      negative: a.negative,
      subject: a.subject,
      sentimentScore: a.sentimentScore
    }
  })).reverse() // Show latest first in the list

  return { analyses, avg, entries }
}

const History = async ({ searchParams }: { searchParams: { range?: string } }) => {
  const range = searchParams.range || 'all'
  const { analyses, avg, entries } = await getData(range)

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, bgcolor: 'neutral.lightBg', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        <HistoryFilter range={range} />

        <Card 
          variant="outlined" 
          sx={{ 
            p: 0, 
            borderRadius: 'xl', 
            overflow: 'hidden',
            bgcolor: 'background.surface',
            mb: 6,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography level="title-lg" fontWeight="bold">
              Mood Trend
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography level="body-xs" fontWeight="bold" sx={{ textTransform: 'uppercase', color: 'text.tertiary' }}>
                Average Mood Score
              </Typography>
              <Typography level="h3" fontWeight="xl" color="primary">
                {avg}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 3, height: '400px' }}>
            {analyses.length > 0 ? (
              <HistoryChart data={analyses} />
            ) : (
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                <Typography level="title-lg">No data for this period</Typography>
                <Typography level="body-md" sx={{ color: 'text.secondary' }}>Try a different range or add more entries.</Typography>
              </Box>
            )}
          </Box>
        </Card>

        {entries.length > 0 && (
          <Box>
            <Typography level="h4" fontWeight="bold" sx={{ mb: 3, color: 'primary.solidBg' }}>
              Entries in this Period
            </Typography>
            <EntryCardContainer entries={entries} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default History