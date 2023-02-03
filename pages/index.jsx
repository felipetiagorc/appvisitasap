import Head from 'next/head';
import Image from 'next/image';
import Inicial from 'components/inicial';
import Header from 'containers/Header';
import { useEffect } from 'react';
import Layout from 'containers/layout';
import { getSession } from 'next-auth/react';
import LeftSidebar from '../containers/LeftSidebar';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import { wrapper } from '../store/store';
import { useStore } from '../store/zustandStore';

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    // we can set the initial state from here
    await store.dispatch(setPageTitle({ title: 'Inicio' }));
  }
);
// export const getServerSideProps = async context => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     };
//   }
//   return {
//     props: {
//       session
//     }
//   };
// };

export default function Home() {
  const pageTitle = useStore(state => state.pageTitle);
  console.log('pageTitlez: ', pageTitle);
  // const newPageTitle = useStore(state => state.setPageTitle('novoTitulo'));
  // console.log('newPageTitle: ', newPageTitle);

  return (
    <>
      <Head>
        <title>AppVisitaSAP</title>
        <meta name='description' content='App para envio de docs' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Inicial />
      {/* <Inicial user={session?.user?.name} /> */}
    </>
  );
}
