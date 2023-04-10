import React from 'react';

import { Html, Sphere } from '@react-three/drei';

import { Box, Typography, styled } from '@mui/material';

const NodeTipContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',

  marginLeft: 16,
  transform: 'translateY(-50%)',
}));

type NodeProps = {
  name: string;
  position?: [number, number, number];
  color: string;
};

export default function Node({ name, position, color }: NodeProps) {
  if (!position) return null;

  return (
    <Sphere position={position} args={[0.05]} castShadow receiveShadow>
      <meshPhongMaterial color={color} />

      <Html distanceFactor={5}>
        <NodeTipContainer>
          <Typography>{name}</Typography>
          <Typography>({position.join(', ')})</Typography>
        </NodeTipContainer>
      </Html>
    </Sphere>
  );
}
