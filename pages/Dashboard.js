import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import Dashboard from '../features/dashboard/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Dashboard' }));
  }, []);

  return <Dashboard />;
}

export default InternalPage;
