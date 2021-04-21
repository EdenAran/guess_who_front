import { useHistory } from "react-router"
import { useEffect } from "react"
import { gameService } from "../services/game.service"
import { Loader } from "../cmps/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addGame, getGames, updateGame } from "../store/actions/gameActions";

export function Rooms() {

    const history = useHistory();
    const user = useSelector(state => state.userReducer.user);
    const games = useSelector(state => state.gameReducer.games);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGames())
        // eslint-disable-next-line
    }, [])

    const startGame = async () => {
        const game = await dispatch(addGame(user))
        await dispatch(getGames())
        history.push(`/game/${game._id}`)
    }

    const joinGame = async (game) => {
        if (user.id !== game.player1.id && !game.player2.id) game.player2 = user;
        await dispatch(updateGame(game))
        history.push(`/game/${game._id}`)
    }

    return (
        <div className="rooms">
            <h1>Choose a game to join or start a new one</h1>
            <button onClick={startGame}>Start a new game</button>
            <ul>
                {!games && <Loader />}
                {games?.map(game => <li className="room" key={game._id} >
                    <h4>{game.player1.username}</h4>
                    <h6>VS</h6>
                    <h4>{game.player2.username || '----'}</h4>
                    <button onClick={() => joinGame(game)} disabled={game.player1.id !== user.id && game.player2.id && game.player2.id !== user.id}>Join</button>
                </li>)}
            </ul>
        </div>
    )
}
