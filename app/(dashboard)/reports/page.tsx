'use client'

import { getWellnessReport } from "@/utils/api"
import { useEffect, useState } from "react"
import { 
  Box, Typography, Card, Grid, Chip, Divider, 
  CircularProgress, Stack, AspectRatio 
} from '@mui/joy'
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const WellnessReportPage = () => {
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getWellnessReport()
        if (res.data) {
          setReport(res.data)
        } else if (res.message) {
          setError(res.message)
        } else if (res.error) {
          setError(res.error)
        }
      } catch (err: any) {
        setError(err.message || "Failed to load your wellness report.")
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress size="lg" />
          <Typography level="title-lg">Curating your wellness report...</Typography>
        </Stack>
      </Box>
    )
  }

  if (error || !report) {
    return (
      <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}>
        <Card variant="soft" color="warning" sx={{ p: 4, maxWidth: '600px', textAlign: 'center' }}>
          <Typography level="title-lg" sx={{ mb: 2 }}>Wellness Insight</Typography>
          <Typography level="body-md">{error || "No data available yet."}</Typography>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, bgcolor: 'neutral.lightBg', minHeight: '100%' }}>
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        <Box sx={{ mb: 6 }}>
          <Typography level="h1" fontWeight="xl" sx={{ mb: 1, color: 'primary.solidBg' }}>
            Monthly Wellness Report
          </Typography>
          <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
            A comprehensive look at your emotional journey over the past 30 days.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Summary Section */}
          <Grid xs={12}>
            <Card 
              variant="outlined" 
              sx={{ 
                p: 4, 
                borderRadius: '2xl', 
                bgcolor: 'background.surface',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'md',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.05 }}>
                <AutoAwesomeIcon sx={{ fontSize: '150px' }} />
              </Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <AutoAwesomeIcon color="primary" />
                <Typography level="title-lg" fontWeight="bold">AI Executive Summary</Typography>
              </Stack>
              <Typography level="body-lg" sx={{ lineHeight: 1.7, color: 'text.primary' }}>
                {report.summary}
              </Typography>
            </Card>
          </Grid>

          {/* Advice Section */}
          <Grid xs={12} md={7}>
            <Card 
              variant="soft" 
              color="primary"
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: '2xl',
                bgcolor: 'primary.lightBg',
                border: '1px solid',
                borderColor: 'primary.softBg'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <PsychologyIcon />
                <Typography level="title-lg" fontWeight="bold" sx={{ color: 'primary.solidBg' }}>Chief AI Advice</Typography>
              </Stack>
              <Typography level="body-md" sx={{ lineHeight: 1.6, color: 'text.primary', fontStyle: 'italic' }}>
                "{report.advice}"
              </Typography>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid xs={12} md={5}>
            <Stack spacing={3}>
              <Card variant="outlined" sx={{ borderRadius: 'xl', p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography level="body-xs" fontWeight="bold" sx={{ textTransform: 'uppercase', color: 'text.tertiary', mb: 0.5 }}>
                      Score Trend
                    </Typography>
                    <Typography level="title-lg" fontWeight="bold">
                      {report.scoreTrend}
                    </Typography>
                  </Box>
                  <TrendingUpIcon color="primary" sx={{ fontSize: '2rem' }} />
                </Stack>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 'xl', p: 3 }}>
                <Box>
                  <Typography level="body-xs" fontWeight="bold" sx={{ textTransform: 'uppercase', color: 'text.tertiary', mb: 1 }}>
                    Common Mood
                  </Typography>
                  <Chip color="primary" variant="solid" size="lg">
                    {report.commonMood}
                  </Chip>
                </Box>
              </Card>
            </Stack>
          </Grid>

          {/* Top Subjects */}
          <Grid xs={12}>
            <Card variant="outlined" sx={{ borderRadius: '2xl', p: 4, bgcolor: 'background.surface' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <BookmarkIcon color="primary" />
                <Typography level="title-lg" fontWeight="bold">Recurring Themes</Typography>
              </Stack>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {report.topSubjects.map((subject: string) => (
                  <Chip 
                    key={subject} 
                    variant="soft" 
                    size="lg" 
                    sx={{ px: 2, py: 1, borderRadius: 'md', fontWeight: 'md' }}
                  >
                    {subject}
                  </Chip>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default WellnessReportPage