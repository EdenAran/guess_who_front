import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Loader } from "../cmps/Loader";
import { TileList } from "../cmps/TileList";
import { TilePreview } from "../cmps/TilePreview";
import { socketService } from "../services/socket.service";
import { removeGame, updateGame } from "../store/actions/gameActions";

export function Game() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [game, setGame] = useState();
    const [selectedTile, setSelectedTile] = useState();
    const [isStart, setIsStart] = useState(false);
    // const [isShowErr, setIsShowErr] = useState(false);
    const [player, setPlayer] = useState(null)
    const games = useSelector(state => state.gameReducer.games)
    const user = useSelector(state => state.userReducer.user)

    useEffect(() => {
        const currGame = games.find(game => game._id === id)
        const tile = currGame.tiles[Math.floor(Math.random() * 25 + 1)]
        const currPlayer = currGame.player1.id === user.id ? 'player1' : currGame.player2.id === user.id ? 'player2' : null;
        if (currPlayer) currGame[currPlayer].tiles = currGame.tiles;
        setTilesLeft(currGame, currPlayer)
        setSelectedTile(tile)
        setPlayer(currPlayer)
        socketService.emit('joined game', currGame._id )
        socketService.on('delete game', () => {
            history.push('/room')
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const currGame = games.find(game => game._id === id);
        if (currGame.player1.id && currGame.player2.id) setIsStart(true);
        setGame(currGame);
    }, [games, id])

    const setTilesLeft = (currGame, currPlayer = player) => {
        currGame[currPlayer].tilesLeft = 0;
        currGame[currPlayer].tiles.forEach(tile => { if (tile.isShown) currGame[currPlayer].tilesLeft++ });
        dispatch(updateGame(currGame))
    }

    const DeleteGame = async () => {
        socketService.emit('game deleted', game._id)
        history.push('/room')
        dispatch(removeGame(game._id));
    }

    const toggleIsShown = (tile) => {
        const currTile = { ...tile };
        currTile.isShown = !currTile.isShown;
        const tileIdx = game.tiles.findIndex(tile => tile.name === currTile.name)
        const currGame = { ...game }
        currGame[player].tiles.splice(tileIdx, 1, currTile)
        setTilesLeft(currGame);
    }
    return (
        <>
            {!game && <Loader />}
            { game &&
                <div className="game">
                    <div className="actions">
                        <button className="delete-btn" onClick={DeleteGame}>Delete game</button>
                        {/* <button className="start-btn" disabled={isStart} onClick={startGame}>Start Game</button> */}
                        {/* {isShowErr && <div className="err-msg">Waiting for 2nd player</div>} */}
                    </div>
                    <div className="players">
                        {/* <h3>player1: {game.player1.username}</h3>
                        <h3>player2: {game.player2.username || '----'}</h3> */}
                        <div>
                            <h3>player1: {game.player1.username}</h3> <h4>Tiles Left: {game.player1.tilesLeft}</h4>
                        </div>
                        <div>
                            <h3>player2: {game.player2.username || '----'}</h3> <h4>Tiles Left: {game.player2.tilesLeft}</h4>
                        </div>
                    </div>
                    {isStart && player && (<>
                        <TilePreview tile={selectedTile} isMain={true} />
                        <TileList tiles={game[player].tiles} toggleIsShown={toggleIsShown} />
                    </>)}
                </div>
            }
        </>
    )
}
