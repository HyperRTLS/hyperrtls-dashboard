import React from 'react';

import useSWRImmutable from 'swr/immutable';

import { Box, Alert, LinearProgress } from '@mui/material';

import type { NextPageWithTitle } from './_app';

import NetworkHeader from '../components/network/NetworkHeader';
import NetworkList from '../components/network/NetworkList';

type NetworkDevice = {
  id: string;
  name: string;
  lastSeen: number;
};

type NetworkDto = {
  tags: Array<NetworkDevice>;
  anchors: Array<NetworkDevice>;
  gateways: Array<NetworkDevice>;
};

type NetworkDeviceType = 'tags' | 'anchors' | 'gateways';

const NetworkPage: NextPageWithTitle = () => {
  const { data, error } = useSWRImmutable<NetworkDto>('/network');

  const [currentTab, setCurrentTab] = React.useState<NetworkDeviceType>('tags');
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newTab: NetworkDeviceType) => {
      setCurrentTab(newTab);
    },
    [],
  );

  if (!data && error) {
    return (
      <Alert severity="error">Could not fetch network&apos;s devices</Alert>
    );
  }

  if (!data) {
    return <LinearProgress />;
  }

  return (
    <Box component="div">
      <NetworkHeader
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      <NetworkList items={data[currentTab]} />
    </Box>
  );
};

NetworkPage.title = 'Network details';

export default NetworkPage;
export type { NetworkDeviceType };
