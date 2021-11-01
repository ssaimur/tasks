import React, { useRef, useState } from 'react';
import { useGlobalContext } from '../context';
// import { Link } from 'react-router-dom';

const Register = () => {
  const name = useRef(null);
  const phone = useRef(null);
  const address = useRef(null);
  const password = useRef(null);

  const { dispatch } = useGlobalContext();
  const [isFetching, setIsFetching] = useState(false);
  const registerCredentials = {
    name,
    phone,
    password,
    address,
  };

  const handleRegisterSubmit = async (e) => {
    setIsFetching(true);
    const response = await fetch(`/api/auth/customer/register`, {
      method: 'POST',
      headers: { 'content-type': 'application-json' },
      body: JSON.stringify(registerCredentials),
    });

    const newUser = await response.json();
    dispatch({ type: 'REGISTRATION_SUCCESS', payload: newUser });
    setIsFetching(false);
  };

  return (
    <div>
      <div>
        <form onSubmit={(e) => handleRegisterSubmit(e)}>
          <div>
            <input type='text' placeholder='*First name' ref={name} />

            <input
              type='text'
              placeholder='Last name'
              ref={phone}
              id='lastName'
            />
          </div>

          <input
            placeholder='*Password'
            minLength='6'
            autoComplete='off'
            ref={password}
            id='password'
          />

          <input type='text' placeholder='Address' ref={address} id='address' />

          <button disabled={isFetching}>
            {isFetching ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
      <div>
        <p>
          Already have an account?
          {/* <Link to='/login'>Sign in</Link> */}
        </p>
      </div>
    </div>
  );
};

export default Register;
