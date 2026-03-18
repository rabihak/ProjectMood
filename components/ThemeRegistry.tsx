'use client'

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import React from 'react';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#0f172a', // Slate 900
          solidHoverBg: '#1e293b', // Slate 800
          lightBg: '#f1f5f9', // Slate 100
        },
        neutral: {
          solidBg: '#64748b', // Slate 500
          solidHoverBg: '#475569', // Slate 600
          lightBg: '#f8fafc', // Slate 50
        },
      },
    },
  },
  fontFamily: {
    body: 'var(--font-inter), sans-serif',
    display: 'var(--font-inter), sans-serif',
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      {children}
    </CssVarsProvider>
  );
}
