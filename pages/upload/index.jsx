import Header from 'components/Header';
// import { UploadForm } from 'components/UploadForm';
import React from 'react';
import MultipleFileInput from 'components/MultipleFileInput';

const documentos = [
  { id: 1, tipoDoc: 'rg', nomeDoc: 'rg', label: 'RG' },
  { id: 2, tipoDoc: 'cpf', nomeDoc: 'cpf', label: 'CPF' },
  { id: 3, tipoDoc: 'certidao', nomeDoc: 'certidao', label: 'Certidão' },
];

export default function Upload() {
  return (
    <>
      <MultipleFileInput />
    </>
  );
}

Upload.getLayout = function getLayout(page) {
  return (
    <>
      <Header>{page}</Header>
    </>
  );
};
