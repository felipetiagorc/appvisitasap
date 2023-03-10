import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import ProfileSettings from '../features/settings/profilesettings';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Perfil Usuário' }));
  }, []);

  return <ProfileSettings />;
}

export default InternalPage;
