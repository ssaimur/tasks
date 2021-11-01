import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

const AuthContext = React.createContext();

const getLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

// sets the current social medial user
const initialState = {
  user: getLocalStorage(),
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
