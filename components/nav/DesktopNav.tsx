import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, AppBar, Toolbar, Button, styled } from '@mui/material';

import { navItems } from './common';

const AppBarContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const AppBarToolbar = styled(Toolbar)(() => ({
  justifyContent: 'flex-end',
}));

type AppBarButtonProps = {
  active?: boolean;
};

const AppBarButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<AppBarButtonProps>(({ theme, active }) => ({
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
}));

function DesktopNav() {
  const router = useRouter();

  return (
    <AppBarContainer>
      <AppBar elevation={0} position="static">
        <AppBarToolbar>
          {navItems.map(({ name, path }) => (
            <Link key={path} href={path} passHref prefetch={false}>
              <AppBarButton active={router.pathname === path}>
                {name}
              </AppBarButton>
            </Link>
          ))}
        </AppBarToolbar>
      </AppBar>
    </AppBarContainer>
  );
}

export default DesktopNav;
