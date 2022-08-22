import Head from 'next/head';
import Link from 'next/link';

import { Container, Box, Typography, Button, styled } from '@mui/material';

const PageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  padding: theme.spacing(3),
  gap: theme.spacing(3),
}));

function NotFound() {
  return (
    <>
      <Head>
        <title>Oops, asset not found</title>
      </Head>
      <PageContainer>
        <Box component="div">
          <Typography variant="h2">Sir, we lost them</Typography>
          <Typography>
            Looks like we do not support interdimensional asset tracking yet.
          </Typography>
          <Typography>How about something we can actually find?</Typography>
        </Box>
        <Link href="/" passHref>
          <Button>Take me home</Button>
        </Link>
      </PageContainer>
    </>
  );
}

export default NotFound;
