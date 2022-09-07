import { useRouter } from 'next/router';

import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  styled,
} from '@mui/material';

import { navItems } from './common';

const BottomNavigationContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,

  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const BottomNavigationItem = styled(BottomNavigationAction)(({ theme }) => ({
  '&.Mui-selected': {
    color: theme.palette.text.primary,
  },
}));

function MobileNav() {
  const router = useRouter();

  const onChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    router.push(value);
  };

  return (
    <BottomNavigationContainer>
      <BottomNavigation
        component="nav"
        onChange={onChange}
        showLabels
        value={router.pathname}
      >
        {navItems.map(({ name, path, icon }) => (
          <BottomNavigationItem
            key={path}
            label={name}
            value={path}
            icon={icon}
          />
        ))}
      </BottomNavigation>
    </BottomNavigationContainer>
  );
}

export default MobileNav;
