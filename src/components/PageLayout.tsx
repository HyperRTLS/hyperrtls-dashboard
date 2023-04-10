import { Box, styled } from '@mui/material';

export default styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',

  [theme.breakpoints.down('sm')]: {
    paddingBottom: 56,
  },
}));
