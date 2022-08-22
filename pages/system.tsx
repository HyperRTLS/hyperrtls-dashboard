import React from 'react';

import Head from 'next/head';

import useSWR from 'swr';

import {
  Alert,
  LinearProgress,
  Container,
  Box,
  Typography,
  styled,
} from '@mui/material';

import HealthStatus from '../components/system/HealthStatus';
import PlatformInfo from '../components/system/PlatformInfo';
import SystemLoad from '../components/system/SystemLoad';

const PageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const SystemInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const SystemInfoHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(10),
  },
}));

interface ISystemInfo {
  health: {
    dynsec: boolean;
    gateway: boolean;
    prisma: boolean;
  };
  info: {
    osInfo: {
      platform: string;
      distro: string;
      release: string;
      kernel: string;
      arch: string;
    };
    mem: {
      total: number;
      free: number;
      used: number;
    };
    currentLoad: {
      currentLoad: number;
    };
  };
}

function System() {
  const { data, error } = useSWR<ISystemInfo>('/system/info', {
    refreshInterval: 5e3,
  });

  if (!data && error) {
    return <Alert severity="error">Could not fetch system information</Alert>;
  }

  if (!data) {
    return <LinearProgress />;
  }

  const healthStatusItems = [
    { name: 'Dynamic Security', healthy: data.health.dynsec },
    { name: 'MQTT Gateway', healthy: data.health.gateway },
    { name: 'Prisma', healthy: data.health.prisma },
  ];

  const platformInfoItems = [
    { name: 'Platform', value: data.info.osInfo.platform },
    { name: 'Distro', value: data.info.osInfo.distro },
    { name: 'Release', value: data.info.osInfo.release },
    { name: 'Kernel', value: data.info.osInfo.kernel },
    { name: 'Architecture', value: data.info.osInfo.arch },
  ];

  const systemLoadItems = [
    {
      name: 'Memory usage',
      value: `${(data.info.mem.used / 1e6).toFixed(2)}/${(
        data.info.mem.total / 1e6
      ).toFixed(2)}MB`,
      fill: (data.info.mem.used / data.info.mem.total) * 100,
    },
    {
      name: 'CPU usage',
      value: `${data.info.currentLoad.currentLoad.toFixed(2)}%`,
      fill: data.info.currentLoad.currentLoad,
    },
  ];

  return (
    <>
      <Head>
        <title>Asset tracking system status</title>
      </Head>
      <PageContainer>
        <SystemInfoContainer>
          <SystemInfoHeader variant="h2">System information</SystemInfoHeader>

          <HealthStatus items={healthStatusItems} />

          <DetailsContainer>
            <PlatformInfo items={platformInfoItems} />
            <SystemLoad items={systemLoadItems} />
          </DetailsContainer>
        </SystemInfoContainer>
      </PageContainer>
    </>
  );
}

export default System;
