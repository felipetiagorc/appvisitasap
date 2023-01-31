import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import Dashboard from '../features/dashboard/index';
import { wrapper } from '../store/store';
import Layout from '@/containers/layout';

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      // we can set the initial state from here
      await store.dispatch(setPageTitle({ title: 'Dashboard' }));

      console.log('State on server', store.getState());

      //   return {
      //     props: {
      //       title: 'Dash'
      //     }
      //   };
    }
);
function InternalPage() {
  return <Dashboard />;
}

export default InternalPage;
