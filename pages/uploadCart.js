import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import UploadCart from '../features/uploadCart';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Upload' }));
  }, []);

  return <UploadCart />;
}

export default InternalPage;
