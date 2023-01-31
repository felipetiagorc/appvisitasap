import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../../store/slices/headerSlice';
import { addNewCadastro } from '../cadastroSlice';

const INITIAL_CADASTRO_OBJ = {
  first_name: '',
  last_name: '',
  email: ''
};

function AddCadastroModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cadastroObj, setCadastroObj] = useState(INITIAL_CADASTRO_OBJ);

  const saveNewCadastro = () => {
    if (cadastroObj.first_name.trim() === '')
      return setErrorMessage('First Name is required!');
    else if (cadastroObj.email.trim() === '')
      return setErrorMessage('Email id is required!');
    else {
      let newCadastroObj = {
        id: 7,
        email: cadastroObj.email,
        first_name: cadastroObj.first_name,
        last_name: cadastroObj.last_name,
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
      };
      dispatch(addNewCadastro({ newCadastroObj }));
      dispatch(
        showNotification({ message: 'Novo cadastro adicionado!', status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setCadastroObj({ ...cadastroObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type='text'
        defaultValue={cadastroObj.first_name}
        updateType='first_name'
        containerStyle='mt-4'
        labelTitle='First Name'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='text'
        defaultValue={cadastroObj.last_name}
        updateType='last_name'
        containerStyle='mt-4'
        labelTitle='Last Name'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='email'
        defaultValue={cadastroObj.email}
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
          onClick={() => saveNewCadastro()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddCadastroModalBody;
