import React, { PropsWithChildren } from 'react';

import { Box, styled } from '@mui/material';

import Nav from './Nav';

const LayoutContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutContainer>
      <Nav />

      {children}
    </LayoutContainer>
  );
}

export default Layout;
