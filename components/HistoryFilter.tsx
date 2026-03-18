'use client'

import React from 'react';
import { Tabs, TabList, Tab, tabClasses, Box, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';

interface HistoryFilterProps {
  range: string;
}

const HistoryFilter = ({ range }: HistoryFilterProps) => {
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent | null, newValue: string | number | null) => {
    if (newValue) {
      router.push(`/history?range=${newValue}`);
    }
  };

  return (
    <Box sx={{ 
      mb: { xs: 4, md: 6 }, 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      justifyContent: 'space-between', 
      alignItems: { xs: 'stretch', md: 'flex-end' }, 
      gap: 3 
    }}>
      <Box>
        <Typography 
          level="h2" 
          fontWeight="xl" 
          sx={{ 
            mb: 1, 
            color: 'primary.solidBg',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          History Overview
        </Typography>
        <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
          Visualize your emotional journey over time.
        </Typography>
      </Box>

      <Tabs
        aria-label="History Range"
        value={range}
        onChange={handleChange}
        sx={{
          bgcolor: 'transparent',
          minWidth: { xs: '100%', md: 'auto' },
          [`& .${tabClasses.root}`]: {
            boxShadow: 'none',
            borderRadius: 'xl',
            flex: { xs: 1, md: 'none' },
            fontSize: { xs: 'sm', sm: 'md' },
            px: { xs: 1, sm: 2 },
            '&.Mui-selected': {
              bgcolor: 'background.surface',
              boxShadow: 'sm',
            },
          },
        }}
      >
        <TabList 
          variant="soft" 
          sx={{ 
            p: 0.5, 
            borderRadius: 'xl',
            display: 'flex',
            width: '100%'
          }}
        >
          <Tab disableIndicator value="all">All</Tab>
          <Tab disableIndicator value="this-week">This Week</Tab>
          <Tab disableIndicator value="last-week">Last Week</Tab>
          <Tab disableIndicator value="last-month">Month</Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};

export default HistoryFilter;
