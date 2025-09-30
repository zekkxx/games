import {useEffect, useState} from 'react';

import GameCard from './GameCard/GameCard.js';
import Modal from '../../components/Modal/Modal.js';
import constellations from '../../util/constellations.js';
import { constellationMemory as instructions } from '../../util/documentation/instructions.js';

function ConstellationMemoryGame(){
    const [gameArrayState, setGameArrayState] = useState<string[]>([]);
    const [chosenArrayState, setChosenArrayState] = useState<string[]>([]);
    const [highscoreState, setHighscoreState] = useState<number>(0);
    const cardsDisplayed = 12;

    const updateHighscore = () => {
        const localStorageMemHighScore = localStorage.getItem('memoryhighscore');
        if (localStorageMemHighScore && parseInt(localStorageMemHighScore) > highscoreState){
            setHighscoreState(parseInt(localStorageMemHighScore));
        } else if (chosenArrayState.length > highscoreState){
            setHighscoreState(chosenArrayState.length);
            localStorage.setItem('memoryhighscore', `${chosenArrayState.length}`);
        }
    }

    const shuffleCards = () => {
        if (chosenArrayState.length === constellations.length){
            setGameArrayState([]);
            return;
        }
        // let cheatArray=[];
        let newArray: string[] = [];
        let newEntryAdded=false;
        while(newArray.length < cardsDisplayed){
            let constellation = constellations[Math.floor(Math.random()*constellations.length)];
            if (!constellation || newArray.includes(constellation)){
                // do nothing
            } else if (chosenArrayState.includes(constellation) === false){
                newEntryAdded=true;
                newArray.push(constellation);
                // cheatArray.push(newArray.length);
            } else if (newArray.length < cardsDisplayed - 1 || newEntryAdded){
                newArray.push(constellation);
            }
        }
        // console.log(cheatArray[0]);
        setGameArrayState(newArray);
    }

    useEffect(() => {
        updateHighscore();
        shuffleCards();
    }, [chosenArrayState]);

    const chooseCard = (name: string) => {
        if(chosenArrayState.includes(name)){
            setChosenArrayState([]);
        } else {
            setChosenArrayState([...chosenArrayState, name]);
        }
    }

    const resetChosenCards = () => {
        setChosenArrayState([]);
    }

    return(
        <>
            <h1>Constellation Memory</h1>
            <h2>Score: {chosenArrayState.length} || High Score: {highscoreState}</h2>
            <div><Modal buttonText="Need Instructions?" title="Instructions:" content={instructions}/></div>
            {chosenArrayState.length===constellations.length ? <h2>Congratulations! You've made the top score possible!</h2> : null}
            {chosenArrayState.length===constellations.length ? <input type="button" onClick={resetChosenCards} value="Replay?"/> : null}
            {gameArrayState.map(constellation => (
                <GameCard
                    onClick={chooseCard}
                    name={constellation}
                    key={constellations.indexOf(constellation)}
                />
            ))}
            
        </>
    )
}

export default ConstellationMemoryGame;
