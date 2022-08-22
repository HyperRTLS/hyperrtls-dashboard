import React from 'react';
import axios from 'axios';
import { SWRConfig } from 'swr';

function SWRProvider({ children }: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          axios(url, { baseURL: process.env.NEXT_PUBLIC_API_BASE_URL }).then(
            (res) => res.data,
          ),
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
