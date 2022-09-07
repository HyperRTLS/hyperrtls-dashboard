import React from 'react';

import { formatDistance, differenceInSeconds } from 'date-fns';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';

import {
  Circle as CircleIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

export type NetworkListItemProps = {
  name: string;
  id: string;
  lastSeen: number;
};

function NetworkListItem({ name, id, lastSeen }: NetworkListItemProps) {
  const [date, setDate] = React.useState(new Date());

  // Refresh tooltip and status indicator every second
  React.useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTimeDistance = formatDistance(date, lastSeen, {
    includeSeconds: true,
  });
  const seenSecondsAgo = differenceInSeconds(date, lastSeen);
  const statusColor = seenSecondsAgo <= 60 ? 'success' : 'error';

  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <Tooltip title={`Last seen ${formattedTimeDistance} ago`}>
            <CircleIcon fontSize="small" color={statusColor} />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary={name} secondary={id} />
        <ChevronRightIcon />
      </ListItemButton>
    </ListItem>
  );
}

export default NetworkListItem;
