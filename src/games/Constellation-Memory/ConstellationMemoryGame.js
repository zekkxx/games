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

    // //is there an array function we can use that will work instead?
    // const hasName = (array, value) => {
    //     for(let i=0; i<array.length; i++){
    //         if(array[i]===value){
    //             return true;
    //         }
    //     }
    //     return false
    // }

    // //Is there a more elegant way to resolve this?
    // const checkHighScore = () => {
    //     if(gameState.score + 1 > gameState.highscore){
    //         setGameState({...gameState, score:gameState.score+1, highscore:gameState.score+1})
    //     } else {
    //         setGameState({...gameState, score:gameState.score+1});
    //     }
    // }

    // const shuffleCards = () => {
    //     let numArray=[];
    //     for(let i=0; gameState.shuffledArray.length; i++){
    //         let num = Math.floor(Math.random()*gameState.shuffledArray.length);
    //         if(numArray.indexOf(num) !== -1){
    //             i--;
    //         } else {
    //             numArray.push(num);
    //         }
    //     }
    //     let newArray=[];
    //     for(let i=0; numArray.length;i++){
    //         let index = numArray[i];
    //         newArray.push(gameState.shuffledArray[index]);
    //     }
    //     setGameState({...gameState, shuffledArray:newArray});
    // }

    // const log = name => {
    //     console.log("We made it this far");
    //     let newArray = gameState.chosenArray;
    //     if(hasName(newArray, name)){
    //         setGameState({...gameState, shuffledArray:constellations, chosenArray:[], score:0});
    //         //Maybe add additional message like: "Ya already got that one!"
    //     } else {
    //         newArray.push(name);
    //         setGameState({...gameState, chosenArray: newArray});
    //         checkHighScore();
    //         shuffleCards();
    //     }
    // }

    const log = name => {
        console.log(name);
    }

    return(
        <>
            <h1>Score: {0} || High Score: {25}</h1>
            {0===constellations.length? <h2>You've made the top score possible!</h2> : null}
            {gameState.shuffledArray.map(constellation => (
                <GameCard
                    log={log}
                    name={constellation}
                    key={constellations.indexOf(constellation)}
                />
            ))}
            
        </>
    )
}

export default ConstellationMemoryGame;
