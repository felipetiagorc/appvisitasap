import FilePreview from './FilePreview';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Form({ nomeDoc }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (file) {
      // create the preview
      const objectUrl = new FileReader();
      objectUrl.onloadend = () => {
        setPreviewUrl(objectUrl.result as string);
      };
      objectUrl.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const { data: session } = useSession();

  // const relacaoDocsVisita = ['RG-Frente', 'RG-Verso', 'CPF', 'Certidão'];

  const user = {
    email: session?.user?.email,
  };

  const onFileUploadChange = (e) => {
    // antes:
    let fileInput = e.target;
    // console.log('e.target: ', e.target);

    if (!fileInput.files) {
      alert('Nenhum arquivo escolhido');
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Sem arquivos');
      return;
    }

    const file = fileInput.files[0];

    // /** File validation */
    // console.log('file.type: ', file.type);
    // if (!file.type.startsWith('image')) {
    //   alert('Selecione um arquivo de imagem');
    //   return;
    // }

    /** Setting file state */
    setFile(file);
    // console.log('setFile:', file);
    // setPreviewUrl(URL.createObjectURL(file));
    // console.log('preview-url:', previewUrl);

    // /** Reset file input */
    // e.currentTarget.type = 'text';
    // e.currentTarget.type = 'file';
  };

  const onCancelFile = (e) => {
    e.preventDefault();
    console.log('From onCancelFile');
  };

  const onUploadFile = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    try {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('email', user.email);
      // formData.append('nomeDoc', docInputName);

      formData.forEach((value, key) => {
        console.log('formData: ', key + ' ' + value);
      });

      // TODOFE = pegar o nomeDoc
      // formData.append('nomeDoc', {nomeDoc});

      const options = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const data = await axios.post('/api/visitante/upload', formData, options);

      console.log('File was uploaded successfylly:', data);
    } catch (e) {
      console.error(e);
      const error =
        e.response && e.response.data
          ? e.response.data.error
          : 'Desculpa, tem algo errado!';
      alert(error);
    }
  };

  return (
    <>
      <form
        className="w-full p-3 border border-gray-500 border-dashed"
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="text" hidden readOnly id="nomeDoc" value={nomeDoc} />
        <div className="flex justify-center mt-8">
          <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
            <p className="flex p-2 text-gray-600">Como deseja enviar:</p>
            <div className="flex flex-col p-2 space-x-2 ">
              <label
                htmlFor="myFileInput"
                className="flex flex-row m-2 w-50 items-center  space-2 p-2  text-white bg-blue-500 rounded shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 duration-200"
              >
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="px-2">Escolher arquivo</p>
              </label>
              <input
                className="hidden "
                id="myFileInput"
                type="file"
                accept="image/*, application/pdf"
                onChange={onFileUploadChange}
              />

              <label
                htmlFor="myFileCam"
                className="flex flex-row m-2 items-center  space-2 p-2 text-white bg-blue-500 rounded shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 duration-200"
              >
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
                <p className="px-2">Tirar foto</p>
              </label>
              <input
                className="hidden"
                id="myFileCam"
                type="file"
                accept="image/*;capture=camera"
                onChange={onFileUploadChange}
              />
            </div>
          </div>
        </div>

        {previewUrl ? <FilePreview fileDataURL={previewUrl} /> : null}
        <br />
        <button
          disabled={true}
          onClick={onCancelFile}
          className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
        >
          Cancel file
        </button>
        <button
          disabled={false}
          onClick={onUploadFile}
          className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
        >
          Upload file
        </button>
      </form>
    </>
  );
}
