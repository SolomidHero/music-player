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

export const setSong = (id, time, state, info) => ({
  value: {
    id: id,
    time: time,
    state: state,
    ...info
  },
  type: 'SONG_SET'
});
