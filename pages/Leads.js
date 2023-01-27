import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import Leads from '../features/leads';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Leads' }));
  }, []);

  return <Leads />;
}

export default InternalPage;
