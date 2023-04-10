import React from 'react';

import { Roboto } from 'next/font/google';

import {
  useMediaQuery,
  responsiveFontSizes,
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
} from '@mui/material';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// useMediaQuery is not available during SSR and defaults to false
// According to https://nighteye.app/dark-mode/, over 80% of people use dark mode
// To prevent initial flicker for most users, we initially render dark version of the website
export default function ThemeProvider({ children }: React.PropsWithChildren) {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersLightMode ? 'light' : 'dark',
            primary: {
              main: '#3F14C5',
            },
          },
          typography: {
            fontFamily: roboto.style.fontFamily,
          },
        }),
      ),
    [prefersLightMode],
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
