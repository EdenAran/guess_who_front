import { useEffect, useState } from "react";
import { TilePreview } from "./TilePreview";

export function TileList({ tiles, toggleIsShown }) {



    return (
        <div className="tile-list">
            {tiles.map((tile, idx) => <TilePreview key={idx} tile={tile} toggleIsShown={toggleIsShown} />)}
        </div>
    )
}
