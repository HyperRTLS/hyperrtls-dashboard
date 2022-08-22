import React from 'react';

import { Box, Typography, styled } from '@mui/material';

const ItemHeader = styled(Typography)(() => ({
  display: 'block',
  lineHeight: 1.75,
}));

interface PlatformInfoItemProps {
  name: string;
  value: string;
}

function PlatformInfoItem({ name, value }: PlatformInfoItemProps) {
  return (
    <ItemHeader variant="overline">
      {name}: {value}
    </ItemHeader>
  );
}

interface PlatformInfoProps {
  items: Array<PlatformInfoItemProps>;
}

function PlatformInfo({ items }: PlatformInfoProps) {
  return (
    <Box component="div">
      {items.map((item) => (
        <PlatformInfoItem key={item.name} {...item} />
      ))}
    </Box>
  );
}

export default PlatformInfo;
