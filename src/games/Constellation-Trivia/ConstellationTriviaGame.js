import { constellationTrivia as instructions } from '../../util/documentation/instructions';
import constellations from '../../util/constellations';
import Modal from '../../components/Modal';
import React, { useEffect, useState } from 'react';

function ConstellationTriviaGame(){
    const [constellationState, setConstellationState] = useState("galaxy");
    const [timerState, setTimerState] = useState(0);
    const [answerButtonsState, setAnswerButtonsState] = useState([]);

    const startGame = () => {
        startNewTimer();
        setAnswerButtonsState([{name: "test", onClick: e=>console.log(e.target.value)}]);
    }

    const startNewTimer = () => {
        setTimerState(10);
    }

    useEffect(()=>{
        setAnswerButtonsState([{name:"Start Game", onClick:startGame}]);
    }, [])

    return (
        <>
            <h1>Constellation Trivia</h1>
            <div><Modal buttonText="Need Instructions?" title="Instructions" content={instructions}/></div>
            <img src={`/images/constellations/${constellationState}.jpg`} alt="Constellation"/> 
            <div>{timerState ? <h3>Time Left: {timerState}</h3> : null}
            {answerButtonsState ? answerButtonsState.map(button=>{
                return <input type="button" value={button.name} onClick={button.onClick} key={button.name}/>
            }) : null}</div>
        </>
    );
}

export default ConstellationTriviaGame;