const initialState = {
  loginStatus: false,
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state, loginStatus: 200, user: action.payload }
    case 'LOGOUT_USER':
      return {...state, loginStatus: false, user: null}

    default:
      return state
  }
}