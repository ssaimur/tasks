const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isFetching: false,
        user: action.payload.user,
        loginError: null,
      };
    case 'REGISTRATION_SUCCESS':
      return {
        ...state,
        isFetching: false,
        user: action.payload.newUser,
        regiError: null,
      };
    default:
      throw new Error(`No matching error type - ${action.type}`);
  }
};

export default reducer;
