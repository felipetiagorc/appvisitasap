import Header from './../../containers/Header';
// import { UploadForm } from 'components/UploadForm';
import React from 'react';
import MultipleFileInput from 'components/MultipleFileInput';
import { setPageTitle } from '../../store/slices/headerSlice';
import { wrapper } from '../../store/store';

const documentos = [
  { id: 1, tipoDoc: 'rg', nomeDoc: 'rg', label: 'RG' },
  { id: 2, tipoDoc: 'cpf', nomeDoc: 'cpf', label: 'CPF' },
  { id: 3, tipoDoc: 'certidao', nomeDoc: 'certidao', label: 'Certidão' }
];

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    await store.dispatch(setPageTitle({ title: 'Envio de Documentos' }));
    console.log('State on server', store.getState());
  }
);

export default function Upload() {
  return (
    <>
      <MultipleFileInput />
    </>
  );
}
