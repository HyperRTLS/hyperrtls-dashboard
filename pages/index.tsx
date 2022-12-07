import React from 'react';

import { Group } from 'three';
import { Canvas } from '@react-three/fiber';
import { OnCenterCallbackProps, OrbitControls, Stage } from '@react-three/drei';

import { Box, styled } from '@mui/material';

import type { NextPageWithTitle } from './_app';

import Stats, { StatsContainer } from '../components/home/Stats';
import AxesHelper from '../components/home/AxesHelper';
import FullscreenToggle from '../components/home/FullscreenToggle';
import NodesGroup from '../components/home/NodesGroup';
import ModelMesh from '../components/home/ModelMesh';

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
  const nodesGroupRef = React.useRef<Group>(null);

  const onStageCentered = React.useCallback((props: OnCenterCallbackProps) => {
    const { x, y, z } = props.center;
    nodesGroupRef.current?.position.set(-x, -y, -z);
  }, []);

  return (
    <PageContainer ref={pageContainerRef}>
      <CanvasContainer>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          frameloop="demand"
          shadows
        >
          <OrbitControls makeDefault />
          <Stats parent={statsContainerRef} />
          <AxesHelper />
          <gridHelper args={[100, 100]} />

          <NodesGroup ref={nodesGroupRef} />

          <Stage
            shadows={{
              type: 'contact',
              size: 2048,
            }}
            intensity={0.5}
            environment="apartment"
            preset={{
              main: [1, 3, 1],
              fill: [-2, -0.5, -2],
            }}
            adjustCamera={false}
            center={{
              onCentered: onStageCentered,
            }}
          >
            <ModelMesh />
          </Stage>
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
