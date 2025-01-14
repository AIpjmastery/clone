import React from 'react';
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'; // Ensure global styles are imported

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
