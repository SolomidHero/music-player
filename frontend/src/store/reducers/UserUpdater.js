const LogoutState = {
  auth: {
    loggedIn: false
  },
  profile: {
    id: null,
    username: null
  },
  song: {
    id: null,
    title: null,
    src: null,
    time: 0
  },
  playlist: []
}

export { LogoutState };

export default (state = LogoutState, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return {
        ...state,
        ...LogoutState
      }
    case 'LOG_IN':
      return {
        ...state,
        auth: {
          loggedIn: true
        },
        profile: action.value
      }
    case 'SONG_SET':
      return {
        ...state,
        song: {
          ...action.value
        }
      }
    case 'SONGS_FETCH':
      return {
        ...state,
        playlist: action.playlist
      }
    default:
      return state
  }
}