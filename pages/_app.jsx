import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import { wrapper } from '../store/store';
import '../styles/globals.css';

import { Layout as MeuLayout } from '@/containers/layout';

function App({ Component, pageProps: { session, ...pageProps }, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
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

export default wrapper.withRedux(App);
