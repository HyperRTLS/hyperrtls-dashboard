import React from 'react';

import { Box, styled } from '@mui/material';

import type { Group } from 'three';
import { Canvas } from '@react-three/fiber';
import { OnCenterCallbackProps, OrbitControls, Stage } from '@react-three/drei';

import Stats, { StatsContainer } from './Stats';
import FullscreenToggle from './FullscreenToggle';
import ModelMesh from './ModelMesh';
import NodesGroup from './NodesGroup';

import type { Anchors, Tags } from '@/interfaces';

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

type LiveViewProps = {
  anchors: Anchors;
  tags: Tags;
};

export default function LiveView({ anchors, tags }: LiveViewProps) {
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
          camera={{ position: [-7, 5, 0], fov: 50 }}
          frameloop="demand"
          shadows
        >
          <OrbitControls
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          <Stats parent={statsContainerRef} />

          {/* TODO */}
          {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['#fa5e52', '#6ce856', '#56a6e8']}
              labelColor="black"
              disabled
            />
          </GizmoHelper> */}

          {/* Render nodes outside of the stage so it does not affect stage's bounding box */}
          {/* By doing so, we must also recalculate the group's position so it fits the stage */}
          <NodesGroup ref={nodesGroupRef} anchors={anchors} tags={tags} />

          <Stage
            shadows={{
              type: 'contact',
              size: 2048,
              normalBias: 0.1,
            }}
            intensity={0.5}
            environment="apartment"
            adjustCamera={false}
            center={{
              onCentered: onStageCentered,
            }}
          >
            <ModelMesh modelPath="../model.glb" />
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
          sx={{ position: 'absolute', right: 0, top: 0 }}
          target={pageContainerRef}
        />
      </CanvasOverlayContainer>
    </PageContainer>
  );
}
