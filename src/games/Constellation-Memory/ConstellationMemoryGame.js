import GameCard from './GameCard';
import constellations from '../constellations';
import React, {useEffect, useState} from 'react';

function ConstellationMemoryGame(){
    const [gameArrayState, setGameArrayState] = useState([]);
    const [chosenArrayState, setChosenArrayState] = useState([])
    const [scoreState, setScoreState] = useState({
        highscore: 0,
        score: 0
    })
    

    //Is there a more elegant way to resolve this?
    const updateScore = () => {
        if (localStorage.getItem('highscore') > scoreState.highscore){
            setScoreState({score:chosenArrayState.length, highscore:localStorage.getItem('highscore')});
        } else if (chosenArrayState.length > scoreState.highscore){
            setScoreState({score:chosenArrayState.length, highscore:chosenArrayState.length})
            localStorage.setItem('highscore', chosenArrayState.length);
        } else {
            setScoreState({...scoreState, score:chosenArrayState.length});
        }
    }

    const shuffleCards = () => {
        let numArray=[];
        for(let i=0; i<12; i++){
            let num = Math.floor(Math.random()*constellations.length);
            if(numArray.indexOf(num) !== -1){
                i--;
            } else {
                numArray.push(num);
            }
        }
        let newArray=[];
        for(let i=0; i<numArray.length;i++){
            let index = numArray[i];
            newArray.push(constellations[index]);
        }
        setGameArrayState(newArray);
    }

    useEffect(() => {
        updateScore();
        shuffleCards();
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
            <h1>Score: {scoreState.score} || High Score: {scoreState.highscore}</h1>
            {scoreState.score===constellations.length ? <h2>You've made the top score possible!</h2> : null}
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
