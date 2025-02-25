import { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

import type { AuthDataType } from '../../types/auth-data';

import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { loginAction } from '../../store/api-actions';

import type { Input, FormEvent } from '../../types/form';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<Input | null>(null);
  const passwordRef = useRef<Input | null>(null);

  const dispatch = useAppDispatch();
  // const navigate=useNavigate();

  const onLogin = (authData: AuthDataType) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onLogin({
        login: loginRef.current?.value,
        password: passwordRef.current?.value,
      });
    }
  };

  return (
    <div className='user-page'>
      <Header titleRender={() => (<h1 className='page-title user-page__title'>Sign in</h1>)} variant={'user-page'} isUserBlock={false} />

      <div className='sign-in user-page__content'>
        <form action='#' className='sign-in__form'
          onSubmit={handleSubmit}
        >
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input className='sign-in__input' type='email' ref={loginRef} placeholder='Email address' name='user-email' id='user-email' />
              <label className='sign-in__label visually-hidden' htmlFor='user-email'>Email address</label>
            </div>
            <div className='sign-in__field'>
              <input className='sign-in__input' type='password' ref={passwordRef} placeholder='Password' name='user-password' id='user-password' />
              <label className='sign-in__label visually-hidden' htmlFor='user-password'>Password</label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button className='sign-in__btn' type='submit'>Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default LoginScreen;
