import React from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { Box, styled } from '@mui/material';

import type { NextPageWithTitle } from './_app';

import Stats, { StatsContainer } from '../components/home/Stats';
import AxesHelper from '../components/home/AxesHelper';
import FullscreenToggle from '../components/home/FullscreenToggle';

const PageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexGrow: 1,

  backgroundColor: theme.palette.background.default,
}));

const CanvasContainer = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
}));

const CanvasOverlayContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  margin: theme.spacing(1),
  pointerEvents: 'none',

  '*': {
    pointerEvents: 'all',
  },
}));

const HomePage: NextPageWithTitle = () => {
  const pageContainerRef = React.useRef<HTMLElement>(null);
  const statsContainerRef = React.useRef<HTMLElement>(null);

  return (
    <PageContainer ref={pageContainerRef}>
      <CanvasContainer>
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }} frameloop="demand">
          <OrbitControls makeDefault />
          <Stats parent={statsContainerRef} />
          <AxesHelper />
          <gridHelper args={[100, 100]} />
        </Canvas>
      </CanvasContainer>

      <CanvasOverlayContainer>
        <StatsContainer
          sx={{ position: 'absolute', left: 0, bottom: 0 }}
          ref={statsContainerRef}
          showFPS
          showRenderTime
          showMemory
        />
        <FullscreenToggle
          sx={{ position: 'absolute', right: 0, bottom: 0 }}
          target={pageContainerRef}
        />
      </CanvasOverlayContainer>
    </PageContainer>
  );
};

HomePage.title = 'Track assets real-time';

export default HomePage;
