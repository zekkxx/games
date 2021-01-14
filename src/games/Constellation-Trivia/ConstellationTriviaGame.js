import { constellationTrivia as instructions } from '../../util/documentation/instructions';
import constellations from '../../util/constellations';
import Modal from '../../components/Modal';
import React, { useEffect, useState, useRef } from 'react';

function ConstellationTriviaGame(){
    const [constellationState, setConstellationState] = useState("galaxy");
    const [answerButtonsState, setAnswerButtonsState] = useState([]);
    const [endGameState, setEndGameState] = useState(false);
    const [timerState, setTimerState] = useState(0);

    const answerRef = useRef([]);
    const guessRef = useRef([]);
    const quizLengthRef = useRef(0);

    const startGame = (numOfQuestions) => {
        setEndGameState(false);
        // setTimerState(10);
        answerRef.current=[];
        guessRef.current=[];
        quizLengthRef.current=numOfQuestions;
        getNewConstellation();
    }

    const createGameOptionButtons = () => {
        setAnswerButtonsState([
            {name:"Start Game Snapshot", onClick:()=>startGame(1)},
            {name:"Start Game (10Q)", onClick:()=>startGame(10)},
            {name:"Start Complete Game", onClick:()=>startGame(constellations.length)}
        ]);
    }

    const endGame = () => {
        setEndGameState(true);
        setAnswerButtonsState([
            {name:"Replay?", onClick:()=>startGame(quizLengthRef.current)},
            {name:"Choose a different version?", onClick:createGameOptionButtons}
        ]);
        console.log("Final Answers:", answerRef.current);
        console.log("Final Guesses:", guessRef.current);
    }

    const getNewConstellation = () => {
        if(answerRef.current.length>=quizLengthRef.current){
            return endGame();
        }
        const newConstellation = constellations[Math.floor(Math.random()*constellations.length)];
        if(answerRef.current.includes(newConstellation) || newConstellation===constellationState){
            getNewConstellation();
        } else {
            answerRef.current.push(newConstellation);
            setConstellationState(newConstellation);
            console.log(answerRef.current);
        }
    }

    const makeGuess = (name) => {
        guessRef.current.push(name);
        getNewConstellation();
    }

    const createAnswers = () => {
        let answerIndex = Math.floor(Math.random()*4);
        let answerArray = [];
        while(answerArray.length<4){
            let constellation = constellations[Math.floor(Math.random()*constellations.length)];
            let name="";
            if(answerArray.length===answerIndex){
                // console.log(constellationState,"is the answer:","at position",answerIndex);
                name=constellationState;
            } else if(answerArray.includes(constellation)===false && constellation!==constellationState){
                name=constellation;
            }
            if(name){
                answerArray.push(name);
            }
        }
        return answerArray;
    }

    useEffect(()=>{
        const answerButtons = createAnswers().map(constellation=>{
            return {name:constellation, onClick:()=>makeGuess(constellation)}
        });
        setAnswerButtonsState(answerButtons);
    }, [constellationState])

    useEffect(()=>{
        createGameOptionButtons();
    }, [])

    return (
        <>
            <h1>Constellation Trivia</h1>
            <div><Modal buttonText="Need Instructions?" title="Instructions" content={instructions}/></div>
            {endGameState ? <p>Endgame</p>
                : <img src={`/images/constellations/${constellationState}.jpg`} alt="Constellation"/>}
            <div>{timerState ? <h3>Time Left: {timerState} Seconds</h3> : null}
            {answerButtonsState ? answerButtonsState.map(button=>{
                return <input type="button" value={button.name.toUpperCase()} onClick={button.onClick} key={button.name}/>
            }) : null}</div>
        </>
    );
}

export default ConstellationTriviaGame;