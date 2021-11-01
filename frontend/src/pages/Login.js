import React, { useRef } from 'react';
import { useGlobalContext } from '../../context/authContext/authContext';
import { Link } from 'react-router-dom';
import { handleLoginSubmit } from '../../helper';

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const { loginError, isFetching, dispatch } = useGlobalContext();
  const { type } = loginError || {};
  const loginCredentials = { email, password, dispatch };

  return (
    <div>
      <div>
        <h1>Sign in to boutique</h1>
      </div>
      {type && (
        <div>
          <p>Invalid email or password!</p>
        </div>
      )}
      <div>
        <form
          onSubmit={(e) => handleLoginSubmit(e, loginCredentials)}
          className='loginBox'
        >
          <label htmlFor='email'>
            Email
            <input
              type='email'
              // placeholder='Email'
              required
              ref={email}
              id='email'
            />
          </label>

          <label htmlFor='password'>
            Password
            <div className='passWrap'>
              <input
                minLength='6'
                required
                autoComplete='off'
                ref={password}
                id='password'
              />
            </div>
          </label>

          <button disabled={isFetching}>
            {isFetching ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
      <div>
        <p>
          <Link to='/register'>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
