'use client'

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import React from 'react';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#09090b', // Zinc 950
          solidHoverBg: '#18181b', // Zinc 900
          lightBg: '#f4f4f5', // Zinc 100
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
          solidBg: '#fafafa', // Zinc 50
          solidHoverBg: '#f4f4f5', // Zinc 100
          solidColor: '#09090b', // Zinc 950
          lightBg: 'rgba(250, 250, 250, 0.1)',
          softBg: 'rgba(250, 250, 250, 0.15)',
          softColor: '#fafafa',
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
          primary: '#fafafa', // Zinc 50
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
