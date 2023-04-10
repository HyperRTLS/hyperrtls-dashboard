import React from 'react';

import { Stats as StatsDrei } from '@react-three/drei';

import { Box, styled } from '@mui/material';

interface StatsContainerProps {
  showFPS?: boolean;
  showRenderTime?: boolean;
  showMemory?: boolean;
}

export const StatsContainer = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !['showFPS', 'showRenderTime', 'showMemory'].includes(prop),
})<StatsContainerProps>(({ theme, showFPS, showRenderTime, showMemory }) => ({
  pointerEvents: 'none',

  div: {
    position: 'initial !important',
    display: 'flex',
    gap: theme.spacing(1),

    'canvas:nth-of-type(1)': {
      display: showFPS ? 'block !important' : 'none !important',
    },
    'canvas:nth-of-type(2)': {
      display: showRenderTime ? 'block !important' : 'none !important',
    },
    'canvas:nth-of-type(3)': {
      display: showMemory ? 'block !important' : 'none !important',
    },
  },
}));

interface StatsProps {
  parent: React.RefObject<HTMLElement>;
}

export default function Stats({ parent }: StatsProps) {
  return <StatsDrei parent={parent} />;
}
