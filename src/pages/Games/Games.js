import { Route } from 'react-router-dom';
import React from 'react';
import ConstellationMemoryGame from '../../games/Constellation-Memory';
import ConstellationTriviaGame from '../../games/Constellation-Trivia';
import ConstellationWordGuessGame from '../../games/Constellation-Word-Guess';

function Games(props){
    return(
        <main>
            <Route exact path={`${props.match.url}/memory`} component={ConstellationMemoryGame}></Route>
            <Route exact path={`${props.match.url}/trivia`} component={ConstellationTriviaGame}></Route>
            <Route exact path={`${props.match.url}/word-guess`} component={ConstellationWordGuessGame}></Route>
        </main>
    )
}

export default Games;