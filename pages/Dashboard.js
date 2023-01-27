import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import Dashboard from '../features/dashboard/index';
import { wrapper } from '../store/store';

function InternalPage() {
  return <Dashboard />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      // we can set the initial state from here
      await store.dispatch(setPageTitle({ title: 'Dashboard' }));

      console.log('State on server', store.getState());

      return {
        props: {
          title: 'Dash'
        }
      };
    }
);

export default InternalPage;
