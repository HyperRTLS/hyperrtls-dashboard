import {
  Layers as MapIcon,
  Devices as NetworkIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const navItems = [
  { name: 'Map', path: '/', icon: <MapIcon /> },
  { name: 'Network', path: '/network', icon: <NetworkIcon /> },
  { name: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];

export { navItems };
