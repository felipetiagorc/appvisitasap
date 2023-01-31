import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import Enviados from '../features/settings/billing/';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Histórico de envio' }));
  }, []);

  return <Enviados />;
}

export default InternalPage;
