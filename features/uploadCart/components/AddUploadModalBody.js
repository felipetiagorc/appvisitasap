import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../../store/slices/headerSlice';
import { addNewUpload } from '../uploadSlice';

const INITIAL_CADASTRO_OBJ = {
  first_name: '',
  last_name: '',
  email: ''
};

function AddUploadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadObj, setUploadObj] = useState(INITIAL_CADASTRO_OBJ);

  const saveNewUpload = () => {
    if (uploadObj.first_name.trim() === '')
      return setErrorMessage('First Name is required!');
    else if (uploadObj.email.trim() === '')
      return setErrorMessage('Email id is required!');
    else {
      let newUploadObj = {
        id: 7,
        email: uploadObj.email,
        first_name: uploadObj.first_name,
        last_name: uploadObj.last_name,
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
      };
      dispatch(addNewUpload({ newUploadObj }));
      dispatch(
        showNotification({ message: 'Novo upload adicionado!', status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setUploadObj({ ...uploadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type='text'
        defaultValue={uploadObj.first_name}
        updateType='first_name'
        containerStyle='mt-4'
        labelTitle='First Name'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='text'
        defaultValue={uploadObj.last_name}
        updateType='last_name'
        containerStyle='mt-4'
        labelTitle='Last Name'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='email'
        defaultValue={uploadObj.email}
        updateType='email'
        containerStyle='mt-4'
        labelTitle='Email Id'
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className='btn btn-primary px-6'
          onClick={() => saveNewUpload()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddUploadModalBody;
