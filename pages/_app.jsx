import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

const Layout = ({ Component, pageProps }) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  } else {
    return <Component {...pageProps} />;
  }
};

export default App;
