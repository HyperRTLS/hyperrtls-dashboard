import React from 'react';

import useFullscreen from '../../utils/useFullscreen';

import { Box, IconButton, styled } from '@mui/material';

import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from '@mui/icons-material';

interface FullscreenToggleProps {
  target?: React.RefObject<Element>;
}

function FullscreenToggle({ target, ...rest }: FullscreenToggleProps) {
  const { isFullscreenAvailable, isFullscreenEnabled, toggleFullscreen } =
    useFullscreen({ target });

  if (!isFullscreenAvailable) return null;

  return (
    <Box component="div" {...rest}>
      <IconButton onClick={toggleFullscreen} aria-label="Toggle fullscreen">
        {isFullscreenEnabled ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Box>
  );
}

export default styled(FullscreenToggle)(() => ({}));
