import './style.css';

import React, { useEffect, useRef, useState } from 'react';

import Modal from '../../components/Modal';
import Results from './Results';
import Timer from '../../components/Timer/Timer';
import constellations from '../../util/constellations';
import { constellationTrivia as instructions } from '../../util/documentation/instructions';

function ConstellationTriviaGame(){
    const [constellationState, setConstellationState] = useState("galaxy");
    const [answerButtonsState, setAnswerButtonsState] = useState([]);
    const [endGameState, setEndGameState] = useState(false);
    const gameTimer = Timer();

    const quizRef = useRef([]);
    const quizLengthRef = useRef(0);

    const startGame = (numOfQuestions) => {
        setEndGameState(false);
        quizRef.current=[];
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
        gameTimer.clearTimer();
        setAnswerButtonsState([
            {name:"Replay?", onClick:()=>startGame(quizLengthRef.current)},
            {name:"Choose a different version?", onClick:createGameOptionButtons}
        ]);
        console.log("Quiz Results:", quizRef.current);
    }

    const getNewConstellation = () => {
        if(quizRef.current.length>=quizLengthRef.current){
            return endGame();
        }
        const newConstellation = constellations[Math.floor(Math.random()*constellations.length)];
        if(quizRef.current.map(item=>item.answer).includes(newConstellation) || newConstellation===constellationState){
            getNewConstellation();
        } else {
            setConstellationState(newConstellation);
            gameTimer.startTimer(10);
            console.log(newConstellation);
        }
    }

    const makeGuess = (name) => {
        gameTimer.stopTimer();
        quizRef.current.push({guess:name, answer:constellationState});
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

    useEffect(() => {
        if (gameTimer.timeLeft <= 0 && !endGameState && constellationState !== "galaxy") {
            quizRef.current.push({guess: "", answer: constellationState})
            if (quizLengthRef.current === quizRef.current.length) {
                gameTimer.clearTimer();
                return endGame();
            }
            getNewConstellation();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [constellationState, endGameState, gameTimer, gameTimer.timeLeft]);

    useEffect(()=>{
        const answerButtons = createAnswers().map(constellation=>{
            return {name:constellation, onClick:()=>makeGuess(constellation)}
        });
        setAnswerButtonsState(answerButtons);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [constellationState])

    useEffect(()=>{
        createGameOptionButtons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {endGameState ? <Results quiz={quizRef.current} />
                : (<>
                    <h1>Constellation Trivia</h1>
                    <div><Modal buttonText="Need Instructions?" title="Instructions" content={instructions}/></div>
                    <img src={`/images/constellations/${constellationState}.jpg`} alt="Constellation"/>
                </>)}
            <div className="bPadding">
                {answerButtonsState && (
                    <>
                        {!!gameTimer.timeLeft && <h3>Time Left: {gameTimer.timeLeft} Seconds</h3>}
                        {answerButtonsState.map(button=>{
                            return <input type="button" value={button.name.toUpperCase()} onClick={button.onClick} key={button.name}/>
                        })}
                    </>
                )}
            </div>
        </>
    );
}

export default ConstellationTriviaGame;