
const INITIAL_STATE = {
  games: null,
}
export function gameReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'SET_GAMES':
      return {
        ...state,
        games: action.games
      }
    case 'ADD_GAMES':
      return {
        ...state,
        games: [...state.games, action.game]
      }


    default:
      return state
  }
}