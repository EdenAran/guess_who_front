import { gameService } from "../../services/game.service"
import { socketService } from "../../services/socket.service"

export function getGames() {
    return async dispatch => {
        const games = await gameService.getGames()
        dispatch({ type: 'SET_GAMES', games })
    }
}

export function addGame(user) {
    return async dispatch => {
        const game = await gameService.setGame(user)
        socketService.emit('game updated');
        getGames()
        // dispatch({ type: 'ADD_GAME', game })
        return game
    }
}

export function updateGame(game) {
    return async dispatch => {
        const games = await gameService.update(game);
        socketService.emit('game updated');
        dispatch({ type: 'SET_GAMES', games })
        return game
    }
}

export function removeGame(gameId) {
    return async dispatch => {
        const games = await gameService.remove(gameId);
        // socketService.emit('game updated');
        dispatch({ type: 'SET_GAMES', games })
    }
}

