import { useState } from "react"

export function GameAdd({ createGame }) {

    const [numOfTiles, setNumOfTiles] = useState(25);

    const setTiles = (diff) => {
        const newNum = numOfTiles + diff
        if(newNum > 65 || newNum < 0) return;
        setNumOfTiles(newNum)
    }


    return (
        <form onSubmit={(ev) => createGame(ev, numOfTiles)}>
            <label >How many tiles would you like to have in the game?</label>
            <br />
            <button type="button" onClick={() => setTiles(-1)}>-</button>
            <input type="range" name="numOfTiles" min="0" max="65" value={numOfTiles} onChange={({ target }) => setNumOfTiles(+target.value)} />
            <button type="button" onClick={() => setTiles(+1)}>+</button>
            <h6>{numOfTiles}</h6>
            <button>Start the game</button>
        </form>
    )
}
