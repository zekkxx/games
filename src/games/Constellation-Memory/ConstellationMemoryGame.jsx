import React, {useEffect, useState} from 'react';

import GameCard from './GameCard';
import Modal from '../../components/Modal';
import constellations from '../../util/constellations';
import { constellationMemory as instructions } from '../../util/documentation/instructions';

function ConstellationMemoryGame(){
    const [gameArrayState, setGameArrayState] = useState([]);
    const [chosenArrayState, setChosenArrayState] = useState([]);
    const [highscoreState, setHighscoreState] = useState(0);
    const cardsDisplayed = 12;

    const updateHighscore = () => {
        if (localStorage.getItem('memoryhighscore') > highscoreState){
            setHighscoreState(localStorage.getItem('memoryhighscore'));
        } else if (chosenArrayState.length > highscoreState){
            setHighscoreState(chosenArrayState.length);
            localStorage.setItem('memoryhighscore', chosenArrayState.length);
        }
    }

    const shuffleCards = () => {
        if (chosenArrayState.length === constellations.length){
            setGameArrayState([]);
            return;
        }
        // let cheatArray=[];
        let newArray=[];
        let newEntryAdded=false;
        while(newArray.length < cardsDisplayed){
            let constellation = constellations[Math.floor(Math.random()*constellations.length)];
            if (newArray.includes(constellation)){
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenArrayState]);

    const chooseCard = name => {
        if(chosenArrayState.includes(name)){
            setChosenArrayState([]);
        } else {
            setChosenArrayState([...chosenArrayState, name]);
        }
    }

    return(
        <>
            <h1>Constellation Memory</h1>
            <h2>Score: {chosenArrayState.length} || High Score: {highscoreState}</h2>
            <div><Modal buttonText="Need Instructions?" title="Instructions:" content={instructions}/></div>
            {chosenArrayState.length===constellations.length ? <h2>Congratulations! You've made the top score possible!</h2> : null}
            {chosenArrayState.length===constellations.length ? <input type="button" onClick={()=>chooseCard(constellations[0])} value="Replay?"/> : null}
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
