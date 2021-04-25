import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Loader } from "../cmps/Loader";
import { TileList } from "../cmps/TileList";
import { TilePreview } from "../cmps/TilePreview";
import { socketService } from "../services/socket.service";
import { getGames, removeGame, updateGame } from "../store/actions/gameActions";

export function Game() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [game, setGame] = useState();
    const [selectedTile, setSelectedTile] = useState();
    const [isStart, setIsStart] = useState(false);
    const [isShowSelectedTiles, setIsShowSelectedTiles] = useState(false);
    const [player, setPlayer] = useState(null);
    const [moves, setMoves] = useState([]);
    const games = useSelector(state => state.gameReducer.games)
    const user = useSelector(state => state.userReducer.user)
    useEffect(() => {
        const currGame = games.find(game => game._id === id)
        const currPlayer = currGame.player1.id === user.id ? 'player1' : currGame.player2.id === user.id ? 'player2' : null;
        if (currPlayer) {
            currGame[currPlayer].tiles = currGame.tiles;
            setTilesLeft(currGame, currPlayer)
            setSelectedTile(currGame.tiles[currGame.selectedTilesIdx[currPlayer]])
        }
        setPlayer(currPlayer)
        socketService.emit('joined game', currGame._id)
        socketService.on('delete game', () => {
            dispatch(getGames())
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
        const tileIdx = game.tiles.findIndex(tile => tile.name === currTile.name);
        const currGame = { ...game };
        currGame[player].tiles.splice(tileIdx, 1, currTile);
        setTilesLeft(currGame);
        setMoves([...moves, currTile]);
    }

    const undoMove = () => {
        const currMoves = [...moves];
        const lastMove = currMoves.splice(-1, 1)[0];
        toggleIsShown(lastMove);
        setMoves(currMoves);

    }

    return (
        <>
            {!game && <Loader />}
            { game &&
                <div className="game">
                    <button onClick={()=>history.push('/')}>Back to home</button>
                    <div className="actions">
                        <button className="delete-btn" onClick={DeleteGame}>Delete game</button>
                        <button disabled={!moves.length} onClick={undoMove}>Undo</button>
                    </div>
                    <div className="players">
                        <div>
                            <h3>player1: {game.player1.username}</h3> <h4>Tiles Left: {game.player1.tilesLeft}</h4>
                        </div>
                        <div>
                            <h3>player2: {game.player2.username || '----'}</h3> <h4>Tiles Left: {game.player2.tilesLeft}</h4>
                        </div>
                    </div>
                    {isStart && (<>
                        {player && (<>
                            <TilePreview tile={selectedTile} isMain={true} />
                            <TileList tiles={game[player].tiles} toggleIsShown={toggleIsShown} />
                        </>)}
                        {!player && (<>
                            <button onClick={() => setIsShowSelectedTiles(!isShowSelectedTiles)}>{isShowSelectedTiles ? 'Hide' : 'Reveal'} Selected Tiles</button>
                            {isShowSelectedTiles && <div className="flex">
                                <TilePreview tile={game.tiles[game.selectedTilesIdx.player1]} isMain={true} />
                                <TilePreview tile={game.tiles[game.selectedTilesIdx.player2]} isMain={true} />
                            </div>}
                            <TileList tiles={game.tiles} toggleIsShown={() => { }} />
                        </>)}

                    </>)}
                </div>
            }
        </>
    )
}
