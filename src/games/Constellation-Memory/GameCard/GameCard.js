import React from "react";
import "./styles.css";

function GameCard(props) {
    return(
        <img
            src={"/images/"+props.name+".jpg"}
            alt={props.name+" constellation"}
            onClick={() => props.log(props.name)}
        />
    );
}

export default GameCard;