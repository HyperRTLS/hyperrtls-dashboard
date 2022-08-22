import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Toolbar, Button, Box, styled } from '@mui/material';
import {
  Place as MapIcon,
  Cloud as NetworkIcon,
  Storage as SystemIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const navItems = [
  { name: 'Map', path: '/', icon: MapIcon },
  { name: 'Network', path: '/network', icon: NetworkIcon },
  { name: 'System', path: '/system', icon: SystemIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

const NavToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'center',

  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-end',
  },
}));

interface NavItemButtonProps {
  active?: boolean;
}

const NavItemButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<NavItemButtonProps>(({ theme, active }) => ({
  color: theme.palette.text.primary,
  borderRadius: 0,
  borderBottomWidth: 3,
  borderBottomColor: active ? theme.palette.primary.main : 'transparent',
  borderBottomStyle: 'solid',
}));

const NavItemTextContainer = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const NavItemIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

interface NavItemProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  active?: boolean;
}

function NavItem({ name, path, icon, active }: NavItemProps) {
  return (
    <Link href={path} passHref prefetch={false}>
      <NavItemButton size="large" active={active} aria-label={name}>
        <NavItemTextContainer>{name}</NavItemTextContainer>
        <NavItemIconContainer>{icon}</NavItemIconContainer>
      </NavItemButton>
    </Link>
  );
}

function Nav() {
  const router = useRouter();

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <NavToolbar>
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.path}
            name={navItem.name}
            path={navItem.path}
            icon={<navItem.icon />}
            active={router.pathname === navItem.path}
          />
        ))}
      </NavToolbar>
    </AppBar>
  );
}

export default Nav;
