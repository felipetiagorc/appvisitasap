import { useState } from 'react';
import axios from 'axios';

export const useUploadForm = (url: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [image, setImage] = useState(null);

  const postForm = async (formData: FormData) => {
    setIsLoading(true);
    await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
    });
    setProgress(100);
    await new Promise((resolve) => {
      setTimeout(() => resolve('success'), 500);
    });
    console.log('success');
    setIsSuccess(true);
    setProgress(0);
  };

  return { postForm, isSuccess, isLoading, progress };
};
