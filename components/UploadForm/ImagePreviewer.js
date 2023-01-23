import Image from 'next/future/image';
import axios from 'axios';
import { useState } from 'react';
import FileInput from './FileInput';
import { useSession } from 'next-auth/react';
import ProgressBar from './ProgressBar';

const documentos = [
  { id: 1, tipoDoc: 'rg', nomeDoc: 'rg', label: 'RG' },
  { id: 2, tipoDoc: 'cpf', nomeDoc: 'cpf', label: 'CPF' },
  { id: 3, tipoDoc: 'certidao', nomeDoc: 'certidao', label: 'Certidão' },
];

const ImagePreviewer = ({ data: { nomeDoc } }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState('');
  const [message, setMessage] = useState('');

  const updatePreview = (image, cb) => {
    if (image) {
      const path = URL.createObjectURL(image);
      const data = {
        file: image,
        path: path,
      };
      cb(data);
    }
    return;
  };

  // // aqui pega a imagem pelo input e seta o state 'image'
  const handleFileChange = (e) => {
    updatePreview(e.target.files[0], setImage);
  };

  // aqui faz o upload, atraves do botao..
  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      console.log('nenhuma imagem selecionada!');
      return;
    }

    try {
      let startAt = Date.now(); // para rastrear o tempo estimado
      let formData = new FormData();
      formData.append('email', session.user.email);
      formData.append('nomeDoc', tipoDoc);
      formData.append('file', image.file);

      const options = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;

          const percentage = (loaded * 100) / total;
          setProgress(+percentage.toFixed(2));

          const timeElapsed = Date.now() - startAt;
          const uploadSpeed = loaded / timeElapsed;
          const duration = (total - loaded) / uploadSpeed;
        },
      };

      const data = await axios.post('/api/visitante/upload', formData, options);

      console.log('Arquivo enviado com sucesso:', data);
    } catch (e) {
      console.error(e);
      const error =
        e.response && e.response.data
          ? e.response.data.error
          : 'Desculpa, tem algo errado!';
      alert(error);
    }
    setIsSuccess(true);
  };

  return (
    <>
      <ProgressBar progress={progress} remaining={remaining} />
    </>
  );
};
export default ImagePreviewer;
