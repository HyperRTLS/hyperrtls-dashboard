import React from 'react';

import { Box, Typography, LinearProgress, styled } from '@mui/material';

const SystemLoadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ItemHeader = styled(Typography)(() => ({
  lineHeight: 1.75,
}));

interface SystemLoadItemProps {
  name: string;
  value: string;
  fill: number;
}

function SystemLoadItem({ name, value, fill }: SystemLoadItemProps) {
  return (
    <Box component="div">
      <ItemHeader variant="overline">
        {name}: {value}
      </ItemHeader>
      <LinearProgress variant="determinate" value={fill} aria-label={name} />
    </Box>
  );
}

interface SystemLoadProps {
  items: Array<SystemLoadItemProps>;
}

function SystemLoad({ items }: SystemLoadProps) {
  return (
    <SystemLoadContainer>
      {items.map((item) => (
        <SystemLoadItem key={item.name} {...item} />
      ))}
    </SystemLoadContainer>
  );
}

export default SystemLoad;
