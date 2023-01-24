import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import '../styles/globals.css';
import store from '../store/store';
function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <Layout Component={Component} pageProps={pageProps} />
      </SessionProvider>
    </ReduxProvider>
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
