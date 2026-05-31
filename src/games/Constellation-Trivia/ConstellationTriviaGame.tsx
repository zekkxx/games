import './style.css';

import { useEffect, useRef, useState } from 'react';

import Modal from '../../components/Modal/Modal.js';
import ReactTimer from '../../components/ReactTimer.js';
import Results from './Results/Results.js';
import constellations from '../../util/constellations.js';
import { constellationTrivia as instructions } from '../../util/documentation/instructions.js';

export interface question {
    answer: string;
    guess: string;
}

interface answer {
    name: string;
    onClick: () => void;
}

function ConstellationTriviaGame(){
    const [constellationState, setConstellationState] = useState<string>("galaxy");
    const [answerButtonsState, setAnswerButtonsState] = useState<answer[]>([]);
    const [endGameState, setEndGameState] = useState<boolean>(false);
    const gameTimer = ReactTimer();

    const quizRef = useRef<question[]>([]);
    const quizLengthRef = useRef(0);

    const startGame = (numOfQuestions: number) => {
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
    }

    const getNewConstellation = () => {
        if(quizRef.current.length>=quizLengthRef.current){
            return endGame();
        }
        const newConstellation = constellations[Math.floor(Math.random()*constellations.length)];
        if(newConstellation === undefined || quizRef.current.map(item=>item.answer).includes(newConstellation) || newConstellation===constellationState){
            getNewConstellation();
        } else {
            setConstellationState(newConstellation);
            gameTimer.startTimer(10);
        }
    }

    const makeGuess = (name: string) => {
        gameTimer.stopTimer();
        quizRef.current.push({guess:name, answer:constellationState});
        getNewConstellation();
    }

    const createAnswers = () => {
        let answerIndex = Math.floor(Math.random()*4);
        let answerArray: string[] = [];
        while(answerArray.length<4){
            let constellation = constellations[Math.floor(Math.random()*constellations.length)];
            let name="";
            if (!constellation) {
                console.error("Out of bounds answer was given");
            } else if(answerArray.length===answerIndex){
                // console.log(constellationState,"is the answer:","at position",answerIndex); // Cheat
                name=constellationState;
            } else if(answerArray.includes(constellation)===false && constellation!==constellationState){
                name=constellation;
            }
            if(constellation && name){
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
                    <img src={`${import.meta.env.BASE_URL}/images/constellations/${constellationState}.jpg`} alt="Constellation"/>
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