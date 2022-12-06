// TODO: Cleanup

import React from 'react';

import { applyProps, Canvas } from '@react-three/fiber';
import { Instance } from '@react-three/fiber/dist/declarations/src/core/renderer';
import { OrbitControls, Sphere, useGLTF, Stage, Html } from '@react-three/drei';

import useSWRImmutable from 'swr/immutable';

import { Box, LinearProgress, styled } from '@mui/material';

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

const NodeTipContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
}));

type Anchor = {
  id: string;
  name: string;
  position: [number, number, number];
};

type Tag = {
  id: string;
  name: string;
  positions: Array<{
    position: [number, number, number];
  }>;
};

type TagLocationEventData = {
  deviceId: string;
  deviceType: string;
  position: [number, number, number];
};

const sseUrl = new URL(
  '/devices/tags/_events?eventTypes=position',
  process.env.NEXT_PUBLIC_API_BASE_URL || '',
).href;

function RoomMesh() {
  const { scene } = useGLTF('../room.glb', true);

  React.useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.type === 'Mesh')
        applyProps(obj as unknown as Instance, {
          castShadow: true,
          receiveShadow: true,
          'material-envMapIntensity': 0.3,
        });
    });
  }, [scene]);

  return <primitive object={scene} />;
}

const HomePage: NextPageWithTitle = () => {
  const { data: anchors } = useSWRImmutable<Anchor[]>('/devices/anchors');

  const { data: tags, mutate: mutateTags } =
    useSWRImmutable<Tag[]>('/devices/tags');

  const onPositionEvent = React.useCallback(
    (event: MessageEvent) => {
      if (!tags) return;

      const { deviceId, position } = JSON.parse(
        event.data,
      ) as TagLocationEventData;

      const tagIndex = tags.findIndex((tag) => tag.id === deviceId);

      if (tagIndex === -1) return;

      const newTagsArray = [
        ...tags.slice(0, tagIndex),
        {
          ...tags[tagIndex],
          positions: [{ position }],
        },
        ...tags.slice(tagIndex + 1),
      ];

      mutateTags(newTagsArray, { revalidate: false });
    },
    [tags, mutateTags],
  );

  React.useEffect(() => {
    const eventSource = new EventSource(sseUrl);
    eventSource.addEventListener('position', onPositionEvent);

    return () => {
      eventSource.removeEventListener('position', onPositionEvent);
      eventSource.close();
    };
  }, [onPositionEvent]);

  const pageContainerRef = React.useRef<HTMLElement>(null);
  const statsContainerRef = React.useRef<HTMLElement>(null);

  if (!anchors || !tags) {
    return <LinearProgress />;
  }

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
              onCentered: (props) => {
                // TODO: Store coord shift in state, extract nodes outside of stage so it does not interfere with BBox calculations
                console.log(props);
              },
            }}
          >
            <RoomMesh />
            {anchors.map((anchor) => (
              <Sphere
                key={anchor.id}
                position={anchor.position}
                args={[0.05]}
                castShadow
                receiveShadow
              >
                <meshPhongMaterial color="blue" />

                <Html distanceFactor={3}>
                  <NodeTipContainer>
                    <span>{anchor.name}</span>
                    <span>({anchor.position.join(', ')})</span>
                  </NodeTipContainer>
                </Html>
              </Sphere>
            ))}
            {tags.map((tag) => (
              <Sphere
                key={tag.id}
                position={tag.positions[0].position}
                args={[0.05]}
                castShadow
                receiveShadow
              >
                <meshPhongMaterial color="red" />

                <Html distanceFactor={3}>
                  <NodeTipContainer>
                    <span>{tag.name}</span>
                    <span>({tag.positions[0].position.join(', ')})</span>
                  </NodeTipContainer>
                </Html>
              </Sphere>
            ))}
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
