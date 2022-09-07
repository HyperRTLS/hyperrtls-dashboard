import { Box, Tabs, Tab, styled } from '@mui/material';

import type { NetworkDeviceType } from '../../pages/network';

const NetworkHeaderContainer = styled(Box)(({ theme }) => ({
  boxShadow: `inset 0 -2px 0 0 ${theme.palette.divider}`,
}));

const NetworkHeaderTabs = styled(Tabs)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& .MuiTab-root': {
      flexGrow: 1,
    },
  },
}));

export type NetworkHeaderProps = {
  currentTab: NetworkDeviceType;
  handleTabChange: (
    _event: React.SyntheticEvent,
    newTab: NetworkDeviceType,
  ) => void;
};

function NetworkHeader({ currentTab, handleTabChange }: NetworkHeaderProps) {
  return (
    <NetworkHeaderContainer>
      <NetworkHeaderTabs
        value={currentTab}
        onChange={handleTabChange}
        textColor="inherit"
        aria-label="select device type"
      >
        <Tab value="tags" label="Tags" />
        <Tab value="anchors" label="Anchors" />
        <Tab value="gateways" label="Gateways" />
      </NetworkHeaderTabs>
    </NetworkHeaderContainer>
  );
}

export default NetworkHeader;
