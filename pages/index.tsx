import React from 'react';

import { applyProps, Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Sphere,
  useGLTF,
  Stage,
  useHelper,
} from '@react-three/drei';

import useSWRImmutable from 'swr/immutable';

import { Alert, Box, LinearProgress, styled } from '@mui/material';

import type { NextPageWithTitle } from './_app';

import Stats, { StatsContainer } from '../components/home/Stats';
import AxesHelper from '../components/home/AxesHelper';
import FullscreenToggle from '../components/home/FullscreenToggle';
import { BoxHelper } from 'three';

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

// type TagPosition = {
//   id: string;
//   x: number;
//   y: number;
//   z: number;
// };

// type Tag = {
//   id: string;
//   name: string;
//   positions: Array<TagPosition>;
// };

// const sseUrl = new URL(
//   'network/events?deviceTypes=tag&eventTypes=location',
//   process.env.NEXT_PUBLIC_API_BASE_URL || '',
// ).href;

function RoomMesh() {
  const { scene } = useGLTF('../room.glb', true);

  React.useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.type === 'Mesh')
        applyProps(obj, {
          castShadow: true,
          receiveShadow: true,
          'material-envMapIntensity': 0.3,
        });
    });
  }, [scene]);

  return <primitive object={scene} />;
}

const HomePage: NextPageWithTitle = () => {
  // const {
  //   data: devices,
  //   error,
  //   mutate,
  // } = useSWRImmutable<Tag[]>('/devices/tags');

  // const onLocationEvent = React.useCallback((event: MessageEvent) => {
  //   return;
  // }, []);

  // const onLocationEvent = React.useCallback(
  //   (event: MessageEvent) => {
  //     if (!devices) return;

  //     const { deviceType, deviceId, x, y, z } = JSON.parse(
  //       event.data,
  //     ) as TagLocationEventData;

  //     const deviceIndex = devices.findIndex(
  //       (device) =>
  //         device.deviceType === deviceType && device.deviceId === deviceId,
  //     );

  //     if (deviceIndex === -1) return;

  //     const newDevicesArray = [
  //       ...devices.slice(0, deviceIndex),
  //       {
  //         ...devices[deviceIndex],
  //         location: [x, y, z] as [number, number, number],
  //       },
  //       ...devices.slice(deviceIndex + 1),
  //     ];

  //     mutate(newDevicesArray, { revalidate: false });
  //   },
  //   [devices, mutate],
  // );

  // React.useEffect(() => {
  //   const eventSource = new EventSource(sseUrl);
  //   eventSource.addEventListener('location', onLocationEvent);

  //   return () => {
  //     eventSource.removeEventListener('location', onLocationEvent);
  //     eventSource.close();
  //   };
  // }, [onLocationEvent]);

  const pageContainerRef = React.useRef<HTMLElement>(null);
  const statsContainerRef = React.useRef<HTMLElement>(null);

  // if (!devices && error) {
  //   return (
  //     <Alert severity="error">Could not fetch network&apos;s devices</Alert>
  //   );
  // }

  // if (!devices) {
  //   return <LinearProgress />;
  // }

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
            adjustCamera
          >
            <RoomMesh />
          </Stage>

          {/* {devices.map((device) => (
            <Sphere
              key={device.id}
              position={[
                device.positions[0].x,
                device.positions[0].y,
                device.positions[0].z,
              ]}
              args={[0.1]}
            >
              <meshBasicMaterial color="hotpink" />
            </Sphere>
          ))} */}
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
