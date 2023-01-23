import React from 'react';
// import Image from 'next/image';

const FilePreview = ({ fileDataURL, labelText }) => {
  //vai receber o arquivo e exibir seus dados.

  return (
    <>
      {fileDataURL ? (
        <img
          className='h-20 w-20 '
          src={fileDataURL}
          width={60}
          height={60}
          alt={labelText}
        />
      ) : (
        <>sem imagem</>
      )}
    </>
  );
};

export default FilePreview;
