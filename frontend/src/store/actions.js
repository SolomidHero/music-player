import { BACKEND_API } from '../index.js';

export const setSong = (info) => ({
  value: {
    ...info
  },
  type: 'SONG_SET'
});

export const fetchSongs = () => {
  return async dispatch => {
    let headers = { "Content-Type": "application/json" };
    const res = await fetch(BACKEND_API + "/api/audio/", { headers, });
    const playlist = (await res.json())['results'];
    return dispatch({
      type: 'SONGS_FETCH',
      playlist
    });
  }
}

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: "USER_LOADING" });
    console.log("loading")
    const refresh = getState().auth.refresh
    const access = getState().auth.access

    let headers = {
      "Content-Type": "application/json",
    };
    if (access) {
      headers["Authorization"] = `Bearer ${access}`;
    }
    return fetch(BACKEND_API + "/api/auth/user/", { headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'USER_LOADED', user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      })
  }
}

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ username, password });

    return fetch(BACKEND_API + "/api/auth/login/", { headers, body, method: "POST" })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'LOGIN_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        } else {
          dispatch({ type: "LOGIN_FAILED", data: res.data });
          throw res.data;
        }
      })
  }
}

export const register = (username, email, password) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ username, email, password });

    return fetch(BACKEND_API + "/api/auth/register/", { headers, body, method: "POST" })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        } else {
          dispatch({ type: "REGISTRATION_FAILED", data: res.data });
          throw res.data;
        }
      })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };

    const refresh = getState().auth.refresh
    const access = getState().auth.access

    if (access) {
      headers["Authorization"] = `Bearer ${access}`;
    }
    return fetch(BACKEND_API + "/api/auth/logout/", { headers, body: "", method: "POST" })
      .then(res => {
        if (res.status === 204) {
          return { status: res.status, data: {} };
        } else if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'LOGOUT_SUCCESSFUL' });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      })
  }
}