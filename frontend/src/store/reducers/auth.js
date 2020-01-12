const initialState = {
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
  refresh: localStorage.getItem("refresh"),
  access: localStorage.getItem("access"),
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return { ...state, isLoading: true };

    case 'USER_LOADED':
      return { ...state, isAuthenticated: true, isLoading: false, user: action.user };

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("access", action.data.access);
      localStorage.setItem("refresh", action.data.refresh);
      return { ...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null };

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'LOGOUT_SUCCESSFUL':
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      return {
        ...state, errors: action.data, refresh: null, access: null, user: null,
        isAuthenticated: false, isLoading: false
      };

    default:
      return state;
  }
}