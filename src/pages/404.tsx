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

export default function NotFoundPage() {
  return (
    <PageContainer>
      <Box component="div">
        <Typography variant="overline" textAlign="right" display="block" mb={1}>
          404 Not Found
        </Typography>
        <Typography variant="h2">Sir, we lost them</Typography>
        <Typography>
          Looks like we do not support interdimensional asset tracking yet.
        </Typography>
        <Typography>How about something we can actually find?</Typography>
      </Box>

      <Link href="/" passHref prefetch={false}>
        <Button variant="contained">Take me home</Button>
      </Link>
    </PageContainer>
  );
}

NotFoundPage.title = 'Oops, no asset found';
