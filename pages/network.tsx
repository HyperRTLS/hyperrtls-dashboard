import React from 'react';

import useSWRImmutable from 'swr/immutable';

import { Box, Alert, LinearProgress } from '@mui/material';

import type { NextPageWithTitle } from './_app';

import NetworkHeader from '../components/network/NetworkHeader';
import NetworkList from '../components/network/NetworkList';

type Tag = {
  deviceType: 'tag';
  deviceName: string;
  deviceId: string;
  lastSeen: number;
};

type Anchor = {
  deviceType: 'anchor';
  deviceName: string;
  deviceId: string;
  lastSeen: number;
};

type Gateway = {
  deviceType: 'gateway';
  deviceName: string;
  deviceId: string;
  lastSeen: number;
};

type Device = Tag | Anchor | Gateway;

type DeviceType = Device['deviceType'];

type DevicePingEventData = {
  deviceType: DeviceType;
  deviceId: string;
  timestamp: number;
};

const sseUrl = new URL(
  'network/events?eventTypes=ping',
  process.env.NEXT_PUBLIC_API_BASE_URL || '',
).href;

const NetworkPage: NextPageWithTitle = () => {
  const {
    data: devices,
    error,
    mutate,
  } = useSWRImmutable<Device[]>('/network/devices');

  const onPingEvent = React.useCallback(
    (event: MessageEvent) => {
      if (!devices) return;

      const { deviceType, deviceId, timestamp } = JSON.parse(
        event.data,
      ) as DevicePingEventData;

      const deviceIndex = devices.findIndex(
        (device) =>
          device.deviceType === deviceType && device.deviceId === deviceId,
      );

      if (deviceIndex === -1) return;

      const newDevicesArray = [
        ...devices.slice(0, deviceIndex),
        {
          ...devices[deviceIndex],
          lastSeen: timestamp,
        },
        ...devices.slice(deviceIndex + 1),
      ];

      mutate(newDevicesArray, { revalidate: false });
    },
    [devices, mutate],
  );

  React.useEffect(() => {
    const eventSource = new EventSource(sseUrl);
    eventSource.addEventListener('ping', onPingEvent);

    return () => {
      eventSource.removeEventListener('ping', onPingEvent);
      eventSource.close();
    };
  }, [onPingEvent]);

  const [currentTab, setCurrentTab] = React.useState<DeviceType>('tag');
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newTab: DeviceType) => {
      setCurrentTab(newTab);
    },
    [],
  );

  const filteredDevices = React.useMemo(() => {
    return (devices || [])
      .filter((device) => device.deviceType === currentTab)
      .sort((a, b) => (a.deviceName > b.deviceName ? 1 : -1));
  }, [devices, currentTab]);

  if (!devices && error) {
    return (
      <Alert severity="error">Could not fetch network&apos;s devices</Alert>
    );
  }

  if (!devices) {
    return <LinearProgress />;
  }

  return (
    <Box component="div">
      <NetworkHeader
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      <NetworkList items={filteredDevices} />
    </Box>
  );
};

NetworkPage.title = 'Network details';

export default NetworkPage;
export type { DeviceType };
