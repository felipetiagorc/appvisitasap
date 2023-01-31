import Header from '../../containers/Header';
// import { UploadForm } from 'components/UploadForm';
import React from 'react';

import { setPageTitle } from '../../store/slices/headerSlice';
import { wrapper } from '../../store/store';
import ImagePreviewer from '@/features/UploadForm/ImagePreviewer';
import Toggle from '@/features/UploadForm/Toggle';

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
      {documentos.map(data => (
        <Toggle
          key={data.id}
          data={{ type: data.tipoDoc, name: data.nomeDoc, label: data.nomeDoc }}
        >
          <ImagePreviewer
            key={data.id}
            data={{
              type: data.tipoDoc,
              name: data.nomeDoc
            }}
          />
        </Toggle>
      ))}
    </>
  );
}
