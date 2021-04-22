import { useHistory } from "react-router"
import { useEffect, useState } from "react"
import { gameService } from "../services/game.service"
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addGame, getGames, updateGame } from "../store/actions/gameActions";
import { GameAdd } from "./GameAdd";
import { socketService } from "../services/socket.service";

export function Rooms() {

    const history = useHistory();
    const user = useSelector(state => state.userReducer.user);
    const games = useSelector(state => state.gameReducer.games);
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);


    const joinGame = async (game) => {
        if (user.id !== game.player1.id && !game.player2.id) {
            game.player2 = user;
            await dispatch(updateGame(game));
        }
        history.push(`/game/${game._id}`)
    }

    const createGame = async (ev, numOfTiles) => {
        ev.preventDefault()
        await gameService.setGame(user, numOfTiles)
        socketService.emit('game updated');
        dispatch(getGames())
        setIsAdding(false);
    }

    return (
        <div className="rooms">
            <h2>Choose a game to join or start a new one</h2>
            <button onClick={() => setIsAdding(true)}>Add a new game</button>
            {isAdding && <GameAdd createGame={createGame} />}
            <ul>
                {!games && <Loader />}
                {games && games.map(game => <li className="room" key={game._id} >
                    <h4>{game.player1.username}</h4>
                    <h6>VS</h6>
                    <h4>{game.player2.username || '----'}</h4>
                    <h5>{game.tiles.length} Tiles</h5>
                    <button onClick={() => joinGame(game)}>{!game.player2.id ? 'Join' : 'Watch'}</button>
                    {/* <button onClick={() => joinGame(game)} disabled={game.player1.id !== user.id && game.player2.id && game.player2.id !== user.id}>Join</button> */}
                </li>)}
            </ul>
        </div>
    )
}
