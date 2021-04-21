import { httpService } from "./http.service";

export const gameService = {
    getGames,
    setGame,
    getById,
    remove,
    update
}


function getGames() {
    return httpService.get('game')
}

function getById(id) {
    return httpService.get(`game/${id}`)
}

function setGame(user) {
    return httpService.post('game/', { user })
}

function remove(id){
    return httpService.delete(`game/${id}`)
}

function update(game){
    return httpService.put('game/', {game})
}