import Link from 'next/link';

import { Box, Typography, Button } from '@mui/material';

import type { NextPageWithTitle } from './_app';

import PageContainer from '../components/404/PageContainer';

const NotFoundPage: NextPageWithTitle = () => {
  return (
    <PageContainer>
      <Box component="div">
        <Typography variant="h2">Sir, we lost them</Typography>
        <Typography>
          Looks like we do not support interdimensional asset tracking yet.
        </Typography>
        <Typography>How about something we can actually find?</Typography>
      </Box>

      <Link href="/" passHref prefetch={false}>
        <Button>Take me home</Button>
      </Link>
    </PageContainer>
  );
};

NotFoundPage.title = 'Oops, no asset found';

export default NotFoundPage;
