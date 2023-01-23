// LUZ =
// O form tem que ter vários Inputs, um pra cada doc
// cada input terá um State para preview ..
// O form terá outro State 'Geral' (ou outra validacao)

// assim uma pessoa pode ter 2 forms .. um pro filho
// posso validar se todos docs do form foram upados

// Aprender React Hook Form .. ?

/**
 * To querendo rastrear o estado do filho no pai,
 * mas sem subir o estado pro Pai ...
 * pq os filhos precisam ter estados individuais.
 **/

// import axios from 'axios';

import { useState } from 'react';
import FileInput from './FileInput';
import { useSession } from 'next-auth/react';
import FilePreview from './FilePreview';
// import ProgressBar from './ProgressBar';
// import { Container } from './styles';

function Form({ data: { nomeDoc }, pushImages }) {
  const { data: session } = useSession();

  const [imgPreview, setImgPreview] = useState([]);

  const updatePreview = (imgPreview, cb) => {
    if (imgPreview) {
      const path = URL.createObjectURL(imgPreview);
      const data = {
        nomeDoc: nomeDoc,
        file: imgPreview,
        path: path,
      };
      cb(data);
      // pushImages(data.path);   ok
    }
    return;
  };

  // aqui pega a imagem pelo input e seta o state 'image'
  const handleFileChange = (e) => {
    updatePreview(e.target.files[0], setImgPreview);
    console.log('imgPreview:');
  };

  // aqui pega a imagem pelo input e seta o state 'image' 2
  // const handleFileChange = ({ target }) => {
  //   const { name, value, files } = target;
  //   if (files) {
  //     setImage;
  //   }
  //   updatePreview(target.files[0], setImage);
  //   console.log('image:');
  // };

  // form tem a funcao de maniular e passa pro input
  // estado 'image'
  return (
    <>
      <section className="flex border-1 ">
        <div className="flex flex-row flex-wrap justify-center items-center">
          <div>imgPreview: {imgPreview && JSON.stringify(imgPreview)}</div>
          {/* esse é o ImagePreview verdadeiro */}
          {/* <div className="flex flex-col justify-center items-center flex-nowrap align-middle my-6 h-56 w-40 border-2 border-blue-200 border-dashed">
            {image ? (
              <>
                <Image
                  alt={nomeDoc}
                  src={image?.path}
                  width={160}
                  height={190}
                />
              </>
            ) : (
              <></>
            )}
          </div> */}
          {/* esse é o ImagePreview verdadeiro */}

          <div className="my-2">
            {imgPreview ? (
              <FilePreview
                fileDataURL={imgPreview.path}
                labelText={nomeDoc}
                alt={nomeDoc}
              />
            ) : (
              <></>
            )}
            <FileInput
              id={nomeDoc}
              name={nomeDoc}
              labelText={
                <p className="flex flex-col items-center w-20 h-20 justify-center bg-sky-800 border-2  mx-4 px-4 text-white py-1.5 text-center text-sm rounded  cursor-pointer shadow-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                  </svg>
                  Escolher arquivo
                </p>
              }
              onChange={handleFileChange}
            />

            {/* <FileInput
              id={nomeDoc}
              name={nomeDoc}
              labelText={
                <p className="flex flex-col items-center  w-20 h-20 justify-center  bg-sky-800  border-2 border-white mx-4 px-4 text-white py-1.5 text-center text-sm rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white group-hover:text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                  Tirar Foto
                </p>
              }
              //   onChange={handleFileChange}
              accept="image/*"
              capture="environment"
            /> */}
          </div>

          <div className="divider"></div>

          <div className="flex gap-16 flex-wrap">
            {/* <button
              className="bg-green-700 hover:bg-green-600 text-white font-semibold antialiased radio-success py-2 px-4 rounded cursor-pointer"
                onClick={handleSubmitUpload}
            >
              Confirmar
            </button>

            <button
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {}}
            >
              Cancelar
            </button> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
