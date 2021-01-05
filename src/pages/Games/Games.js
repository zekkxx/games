import { Route } from 'react-router-dom';
import React from 'react';
import ConstellationMemoryGame from '../../games/Constellation-Memory';

function Games(props){
    return(
        <main>
            <Route exact path={`${props.match.url}/memory`} component={ConstellationMemoryGame}></Route>
        </main>
    )
}

export default Games;