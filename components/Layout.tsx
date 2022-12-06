import React, { PropsWithChildren } from 'react';

import { Box, styled } from '@mui/material';

import Nav from './nav/Nav';

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',

  [theme.breakpoints.down('sm')]: {
    paddingBottom: 56,
  },
}));

function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutContainer>
      {/* <Nav /> */}

      {children}
    </LayoutContainer>
  );
}

export default Layout;
