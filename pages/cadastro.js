import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import Cadastro from '../features/cadastro';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Cadastro' }));
  }, []);

  return <Cadastro />;
}

export default InternalPage;
