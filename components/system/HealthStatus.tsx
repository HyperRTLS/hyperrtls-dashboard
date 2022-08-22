import React from 'react';

import { Box, Tooltip, Chip, styled } from '@mui/material';

const HealthStatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

interface HealthStatusItemProps {
  name: string;
  healthy: boolean;
}

function HealthStatusItem({ name, healthy }: HealthStatusItemProps) {
  return (
    <Tooltip
      title={healthy ? 'Service is fully operational' : 'Service is down'}
    >
      <Chip
        size="small"
        variant="outlined"
        color={healthy ? 'success' : 'error'}
        label={name}
      />
    </Tooltip>
  );
}

interface HealthStatusProps {
  items: Array<HealthStatusItemProps>;
}

function HealthStatus({ items }: HealthStatusProps) {
  return (
    <HealthStatusContainer>
      {items.map((item) => (
        <HealthStatusItem key={item.name} {...item} />
      ))}
    </HealthStatusContainer>
  );
}

export default HealthStatus;
