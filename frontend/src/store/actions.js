import { BACKEND_API } from '../index.js';

export const logout = () => ({
  type: 'LOG_OUT'
});

export const login = (id, username) => ({
  value: {
    id: id,
    username: username
  },
  type: 'LOG_IN'
});

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