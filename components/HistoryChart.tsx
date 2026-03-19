'use client'
import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis, CartesianGrid } from 'recharts'
import { Card, Typography, Box, Divider } from '@mui/joy'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CustomTooltip = ({ payload, label, active }: any) => {
  if (active && payload && payload.length) {
    const analysis = payload[0].payload
    const dateObj = new Date(label)
    const dateLabel = dateObj.toLocaleString('en-us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    const timeLabel = dateObj.toLocaleTimeString('en-us', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <Card  
        sx={{ 
          p: 2, 
          bgcolor: 'background.surface', 
          opacity: 0.95,
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'xl',
          minWidth: 180
        }}
      >
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <CalendarMonthIcon sx={{ fontSize: '1rem', color: 'text.tertiary' }} />
            <Typography level="body-xs" fontWeight="bold" sx={{ color: 'text.secondary' }}>
              {dateLabel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: '1rem', color: 'text.tertiary' }} />
            <Typography level="body-xs" fontWeight="bold" sx={{ color: 'text.secondary' }}>
              {timeLabel}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: analysis.color || 'primary.solidBg',
              boxShadow: '0 0 4px rgba(0,0,0,0.1)'
            }}
          />
          <Typography level="title-md" fontWeight="xl">
            {analysis.mood}
          </Typography>
        </Box>
        <Typography level="body-xs" sx={{ color: 'text.secondary', pl: 2 }}>
          Sentiment Score: <Typography fontWeight="bold" color="primary">{analysis.sentimentScore}</Typography>
        </Typography>
      </Card>
    )
  }

  return null
}

const HistoryChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--joy-palette-primary-solidBg)" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="var(--joy-palette-primary-solidBg)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--joy-palette-divider)" />
        <XAxis 
          dataKey="createdAt" 
          tick={{ fontSize: 12, fill: 'var(--joy-palette-text-tertiary)' }}
          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          axisLine={false}
          tickLine={false}
          dy={10}
        />
        <YAxis 
          dataKey="sentimentScore" 
          tick={{ fontSize: 12, fill: 'var(--joy-palette-text-tertiary)' }}
          axisLine={false}
          tickLine={false}
          domain={['auto', 'auto']}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--joy-palette-primary-solidBg)', strokeWidth: 1, strokeDasharray: '4 4' }} />
        <Area
          type="monotone"
          dataKey="sentimentScore"
          stroke="var(--joy-palette-primary-solidBg)"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorScore)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart