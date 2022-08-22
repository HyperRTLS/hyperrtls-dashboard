import React from 'react';

import Head from 'next/head';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Stats, { StatsContainer } from '../components/home/Stats';
import AxesHelper from '../components/home/AxesHelper';
import FullscreenToggle from '../components/home/FullscreenToggle';

import { Box, styled } from '@mui/material';

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

function Home() {
  const pageContainerRef = React.useRef<HTMLElement>(null);
  const statsContainerRef = React.useRef<HTMLElement>(null);

  return (
    <>
      <Head>
        <title>Track assets in real time</title>
      </Head>
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
    </>
  );
}

export default Home;
