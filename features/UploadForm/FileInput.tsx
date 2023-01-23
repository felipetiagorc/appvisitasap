// interface FileInputProps {
//   id: string;
//   labelText: string;
//   accept?: string;
//   capture?: "'user' || 'environment'"; // da erro essa merda
// }
// import { useState } from 'react';
// import Image from 'next/future/image';

import React from 'react';
import { useState } from 'react';
// import Image from 'next/image';

const FileInput = ({
  id,
  labelText,
  nomeDoc,
  accept,
  capture,
  type,
  // handleFileChange,
  ...props
}) => {
  const [image, setImage] = useState(null);

  const updatePreview = (image, cb) => {
    if (image) {
      const path = URL.createObjectURL(image);
      const data = {
        nomeDoc: nomeDoc,
        file: image,
        path: path
      };
      cb(data);
      // pushImages(data.path);   ok
    }
    return;
  };

  // aqui pega a imagem pelo input e seta o state 'image'
  const handleFileChange = e => {
    updatePreview(e.target.files[0], setImage);
    console.log('image:');
  };

  return (
    <>
      {/* esse é o ImagePreview verdadeiro */}
      <div className='flex flex-col justify-center items-center flex-nowrap align-middle my-6 h-56 w-40 border-2 border-blue-200 border-dashed'>
        {image ? (
          <>
            <img alt={nomeDoc} src={image?.path} width={160} height={190} />
          </>
        ) : (
          <></>
        )}
      </div>
      {/* esse é o ImagePreview verdadeiro */}
      <label className='flex flex-row-reverse px-0 py-2' htmlFor={id}>
        {labelText}
        <input
          id={id}
          name={nomeDoc}
          type='file'
          accept='.jpg, .png, .pdf'
          style={{ display: 'none' }}
          onChange={handleFileChange}
          {...props}
        />
      </label>
    </>
  );
};
export default FileInput;
