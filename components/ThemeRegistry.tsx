'use client'

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import React from 'react';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#4f46e5', // Indigo 600
          solidHoverBg: '#4338ca', // Indigo 700
          lightBg: '#eef2ff', // Indigo 50
          solidColor: '#ffffff',
        },
        neutral: {
          solidBg: '#71717a', // Zinc 500
          solidHoverBg: '#52525b', // Zinc 600
          lightBg: '#fafafa', // Zinc 50
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#ffffff',
          solidHoverBg: '#f4f4f5', // Zinc 100
          solidColor: '#09090b', // Zinc 950
          lightBg: 'rgba(255, 255, 255, 0.1)',
          softBg: 'rgba(255, 255, 255, 0.15)',
          softColor: '#ffffff',
        },
        neutral: {
          solidBg: '#27272a', // Zinc 800
          solidHoverBg: '#3f3f46', // Zinc 700
          lightBg: '#18181b', // Zinc 900
          softBg: 'rgba(113, 113, 122, 0.2)',
          softColor: '#a1a1aa',
        },
        background: {
          body: '#09090b', // Zinc 950
          surface: '#18181b', // Zinc 900
        },
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa', // Zinc 400
          tertiary: '#71717a', // Zinc 500
        },
        divider: 'rgba(255, 255, 255, 0.08)',
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
    <CssVarsProvider theme={theme} defaultMode="system" modeStorageKey="project-mood-theme">
      {children}
    </CssVarsProvider>
  );
}
