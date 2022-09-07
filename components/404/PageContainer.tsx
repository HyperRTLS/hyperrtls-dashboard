import { Container, styled } from '@mui/material';

const PageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  padding: theme.spacing(3),
  gap: theme.spacing(3),
}));

export default PageContainer;
