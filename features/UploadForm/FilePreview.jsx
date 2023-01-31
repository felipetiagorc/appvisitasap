import React from 'react';
import Image from 'next/image';

const FilePreview = ({ fileDataURL }) => {
  //vai receber o arquivo e exibir seus dados.

  return (
    <>
      <Image
        className="h-20 w-20 "
        src={fileDataURL}
        width={60}
        height={60}
        alt="preview"
      />
    </>
  );
};

export default FilePreview;
