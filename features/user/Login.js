import { useState } from 'react';
import Link from 'next/link';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { getSession, signIn } from 'next-auth/react';

export async function getServerSideProps(context) {
  // aqui poderia receber a req e c/ req.cookie ver se ta autenticado
  // e redirecionar pra outra tela.. mas o next-auth tem o metodo 'getSession'
  const session = await getSession(context);

  // se ja ta logado vai pra tela inicial
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: { session }
  };
}

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: '',
    emailId: ''
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = e => {
    e.preventDefault();
    setErrorMessage('');

    if (loginObj.emailId.trim() === '')
      return setErrorMessage('Email obrigatório!');
    if (loginObj.password.trim() === '')
      return setErrorMessage('Senha obrigatória! (use any value)');
    else {
      setLoading(true);
      // TODO-trocar pro next esse 'localstorage'
      localStorage.setItem('token', 'DumyTokenHere');
      setLoading(false);
      window.location.href = '/app/welcome';
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className='min-h-screen bg-base-200 flex items-center'>
      <div className='card mx-auto w-full max-w-5xl  shadow-xl'>
        <div className='grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl'>
          <div className=''>
            <LandingIntro />
          </div>
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
            <form onSubmit={e => submitForm(e)}>
              <div className='mb-4'>
                <InputText
                  type='emailId'
                  defaultValue={loginObj.emailId}
                  updateType='emailId'
                  containerStyle='mt-4'
                  labelTitle='Email Id'
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type='password'
                  updateType='password'
                  containerStyle='mt-4'
                  labelTitle='Password'
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className='text-right text-primary'>
                <Link href='/forgot-password'>
                  <span className='text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200'>
                    Esqueceu a senha?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass='mt-8'>{errorMessage}</ErrorText>
              <button
                type='submit'
                className={
                  'btn mt-2 w-full btn-primary' + (loading ? ' loading' : '')
                }
              >
                Entrar
              </button>

              <div className='text-center mt-4'>
                Ainda não tem login?{' '}
                <Link href='/register'>
                  <span className='  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200'>
                    Cadastrar
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
