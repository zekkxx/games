import "./styles.css";

import React from "react";

function GameCard(props) {
    return(
        <img
            src={`/images/constellations/${props.name}.jpg`}
            alt={props.name+" constellation"}
            onClick={() => props.onClick(props.name)}
        />
    );
}

export default GameCard;