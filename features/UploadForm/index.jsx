// import ImagePreviewer from './ImagePreviewer';
// import Form from './Form';
import Toggle from './Toggle';
import { useState } from 'react';
// import FileUploadService from './../../services/FileUploadService';
import FileInput from './FileInput';
// import { useSession } from 'next-auth/react';
import FilePreview from './FilePreview';

// docs:
const documentos = [
  { id: 1, tipoDoc: 'rg', nomeDoc: 'rg', label: 'RG' },
  { id: 2, tipoDoc: 'cpf', nomeDoc: 'cpf', label: 'CPF' },
  { id: 3, tipoDoc: 'certidao', nomeDoc: 'certidao', label: 'Certidão' }
];

const session = { user: { email: 'felipetiagorc@yahoo.com.br' } };

// se cada tipo de pessoa tiver uma lista de docs diferente..
// const docList = [
//   {
//     esposa: [
//       { tipoDoc: 'rg', nomeDoc: 'rg', label: 'RG' },
//       { tipoDoc: 'cpf', nomeDoc: 'cpf', label: 'CPF' },
//       { tipoDoc: 'certidao', nomeDoc: 'certidao', label: 'Certidão' },
//     ],
//   },
//   {
//     filho: [
//       { tipoDoc: 'rg', nomeDoc: 'rg', label: 'RG' },
//       { tipoDoc: 'cpf', nomeDoc: 'cpf', label: 'CPF' },
//       { tipoDoc: 'certidao', nomeDoc: 'certidao', label: 'Certidão' },
//     ],
//   },

//   {
//     religioso: [
//       { tipoDoc: 'rg', nomeDoc: 'rg', label: 'RG' },
//       { tipoDoc: 'cpf', nomeDoc: 'cpf', label: 'CPF' },
//       { tipoDoc: 'certidao', nomeDoc: 'certidao', label: 'Certidão' },
//     ],
//   },
// ];

//ao inves disso aqui, preciso pegar o nome ou id do input.. e verificar se já existe no state.

// const docList = documentos.map((doc) => doc.nomeDoc.toLowerCase());
// // ['rg', 'cpf', 'certidao']

// // quero:

// /**  "doc": {
//  *       file:
//  *    }
//  *
//  *
//  */

// // var initialState = [];

// // for (let i = 0; i < docList.length; i++) {
// // initialState.push(new Object(docList[i]: { docList[i], file: '', path: '' });
// //[{"nomeDoc":"rg","file":"","path":""},{"nomeDoc":"cpf","file":"","path":""},{"nomeDoc":"certidao","file":"","path":""}]
// // }

const UploadForm = () => {
  const [files, setFiles] = useState([]);

  const updatePreview = (file, id, cb) => {
    if (file) {
      const path = URL.createObjectURL(file);

      // let id = id
      // let fileReader = new FileReader();
      // let file = event.target.files[0];
      // fileReader.onload = () => {
      //   setFiles([...files, { file_id: id, uploaded_file: fileReader.result }]);
      //   fileReader.readAsDataURL(file);
      // };

      const doc = {
        id: id,
        nomeDoc: file.nomeDoc,
        file: file.path,
        path: path
      };
      cb(doc);
      // pushImages(data);
      // pushImages(data.path);   ok
    }
    return;
  };

  // aqui pega a imagem pelo input e seta o state 'image'

  const handleFileChange = event => {
    updatePreview(event.target.files[0], event.target.id, setFiles);
  };

  const handleSubmit = async event => {
    // if (!image) {
    //   console.log('nenhuma imagem selecionada!');
    //   return;
    // }

    // setLoading(true)
    event.preventDefault();

    // try {
    //   let formData = new FormData();
    //   formData.append('email', session.user.email);

    //   for (const key of Object.keys(state)) formData.append('nomeDoc', nomeDoc);
    //   formData.append('file', data.file);

    //   // const data = await FileUploadService.upload();

    //   console.log('Arquivo enviado com sucesso:', data);
    // } catch (e) {
    //   console.error(e);
    //   const error =
    //     e.response && e.response.data
    //       ? e.response.data.error
    //       : 'Desculpa, tem algo errado!';
    //   alert(error);
    // }
    // setIsSuccess(true);
  };

  return (
    <>
      <div>Images: {files && JSON.stringify(files)}</div>

      {documentos.map(data => (
        <Toggle
          key={data.tipoDoc}
          data={data}
          handleFileChange={handleFileChange}
        >
          {/* <Form
            key={data.nomeDoc}
            data={data}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
          /> */}
          <>
            {files ? (
              <FilePreview
                fileDataURL={files.path}
                labelText={files.nomeDoc}
                alt={files.nomeDoc}
              />
            ) : (
              <></>
            )}
            <FileInput
              id={data.id}
              name={data.nomeDoc}
              labelText={
                <p className='flex flex-col items-center w-20 h-20 justify-center bg-sky-800 border-2  mx-4 px-4 text-white py-1.5 text-center text-sm rounded  cursor-pointer shadow-2xl'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776'
                    />
                  </svg>
                  Escolher arquivo
                </p>
              }
              onChange={handleFileChange}
            />
          </>
        </Toggle>
      ))}

      <button
        className='bg-green-700 hover:bg-green-600 text-white font-semibold antialiased radio-success py-2 px-4 rounded cursor-pointer'
        onClick={handleSubmit}
      >
        Confirmar
      </button>

      <button
        className='bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer'
        onClick={() => {}}
      >
        Cancelar
      </button>
    </>
  );
};
export default UploadForm;
