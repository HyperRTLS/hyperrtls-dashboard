import React from 'react';

import useSWRImmutable from 'swr/immutable';
import { Html, Sphere } from '@react-three/drei';

import { Box, styled } from '@mui/material';

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

function AnchorsGroup() {
  const { data: anchors } = useSWRImmutable<Anchor[]>('/devices/anchors');

  if (!anchors) return null;

  return (
    <group>
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
    </group>
  );
}

export default AnchorsGroup;
