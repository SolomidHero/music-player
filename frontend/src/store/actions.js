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
