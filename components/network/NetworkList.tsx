import React from 'react';

import { List } from '@mui/material';

import NetworkListItem from './NetworkListItem';
import type { NetworkListItemProps } from './NetworkListItem';

export type NetworkListProps = {
  items: Array<NetworkListItemProps>;
};

function NetworkList({ items }: NetworkListProps) {
  return (
    <List>
      {items.map((item) => (
        <NetworkListItem key={item.deviceId} {...item} />
      ))}
    </List>
  );
}

export default NetworkList;
