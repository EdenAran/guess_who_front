import { useState } from "react";

export function TilePreview({ tile, isMain = false, toggleIsShown }) {

    // const [currTile, setCurrTile] = useState(tile);

    // const toggleIsShown = () => {
    //     const newTile = { ...currTile };
    //     newTile.isShown = !newTile.isShown;
    //     setCurrTile({ ...newTile });
    // }
    let className = tile.isShown? '' : 'selected';
    className+= tile.isMarked ? ' marked' : ''
    return (
        <>
            { !isMain && <div className="tile-preview" onClick={() => toggleIsShown(tile)}>
                <img className={className} src={require(`../assets/imgs/${tile.name}.jpg`).default} alt="" />
                <h2>{tile.name}</h2>
            </div>}
            { isMain && <div className="tile-preview main">
                <img src={require(`../assets/imgs/${tile.name}.jpg`).default} alt="" />
                <h2>{tile.name}</h2>
            </div>}
        </>
    )
}
