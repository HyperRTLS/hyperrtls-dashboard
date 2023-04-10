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
          500 Internal Server Error
        </Typography>
        <Typography variant="h2">Sir, the server is on fire</Typography>
        <Typography>Some things just don&apos;t want to be tracked.</Typography>
        <Typography>
          Let us grab the extinguisher and get back to you soon.
        </Typography>
      </Box>

      <Link href="/" passHref prefetch={false}>
        <Button variant="contained">Try again</Button>
      </Link>
    </PageContainer>
  );
}

NotFoundPage.title = 'Oops, no asset found';
