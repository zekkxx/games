import GameCard from './GameCard';
import constellations from '../constellations';
import React, {useState} from 'react';

function ConstellationMemoryGame(){
    const [gameState, setGameState] = useState({
        shuffledArray: constellations,
        chosenArray: [],
        highscore: 0,
        score: 0
    })

    //Is there a more elegant way to resolve this?
    const checkHighScore = () => {
        if(gameState.score === gameState.highscore){
            setGameState({...gameState, score:gameState.score+1, highscore:gameState.score+1})
        } else {
            setGameState({...gameState, score:gameState.score+1});
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
        console.log(numArray);
        let newArray=[];
        for(let i=0; i<numArray.length;i++){
            let index = numArray[i];
            newArray.push(constellations[index]);
        }
        console.log(newArray);
        setGameState({...gameState, shuffledArray:newArray});
    }

    const chooseCard = name => {
        console.log(name);
        let newArray = gameState.chosenArray;
        if(gameState.chosenArray.includes(name)){
            console.log("Choice was in chosenArray");
            setGameState({...gameState, chosenArray:[], score:0});
            //Maybe add additional message like: "Ya already got that one!"
        } else {
            console.log("Choice was not in chosenArray")
            newArray.push(name);
            setGameState({...gameState, chosenArray: newArray});
            checkHighScore();
            shuffleCards();
        }
    }

    return(
        <>
            <h1>Score: {gameState.score} || High Score: {gameState.highscore}</h1>
            {gameState.score===constellations.length? <h2>You've made the top score possible!</h2> : null}
            {gameState.shuffledArray.map(constellation => (
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
