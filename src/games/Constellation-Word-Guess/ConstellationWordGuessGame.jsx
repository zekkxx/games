import './style.css';

import React, {useCallback, useEffect, useState} from 'react';

import constellations from '../../util/constellations';

function ConstellationWordGuessGame(){
    const [victoryCount, setVictoryCount] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [guessedLetters, setGuessedLetters] = useState("");
    const [guessesLeft, setGuessesLeft] = useState(0);
    const [previousConstellation, setPreviousConstellation] = useState("");
    const [currentConstellation, setCurrentConstellation] = useState("");
    const [playerHint, setPlayerHint] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");
    const displayLetters = "abcdefghijklmnopqrstuvwxyz"

    const verifyInput = useCallback((input) => {
        if(!/[a-z]/.test(input) || input.length>1){ //Test input against regular expression
            return setVerificationMessage("This is not an approved letter. Try again.");
        }
        if(guessedLetters.includes(input)) { //Test input against Already Guessed Letters
            return setVerificationMessage("This letter has already been guessed.");
        }
        setVerificationMessage("");
        if (guessedLetters.length > 0){
            setGuessedLetters(`${guessedLetters}, ${input}`);
        } else {
            setGuessedLetters(input);
        }
        //Verification Complete, no compare inputs
        var newWordOutput="";
        var adjustmentMade = false;
        for(let i=0; i<currentConstellation.length; i++){
            if(currentConstellation.charAt(i)===input) { //If the point in the word has the input letter
                newWordOutput += input + " ";
                adjustmentMade = true;
            } else {
                newWordOutput += playerHint.charAt(2*i) + " "; //Due to spaces, i has to be doubled to get the proper next character
            }
        }
        if(!adjustmentMade){
            setGuessesLeft(guessesLeft-1);
        }
        setPlayerHint(newWordOutput.toUpperCase()); //change the output to uppercase and save it back to playerHint
    }, [currentConstellation, guessedLetters, guessesLeft, playerHint]);

    const checkHighScore = useCallback(() => {
        if (localStorage.getItem('hangmanhighscore') > highscore){
            setHighscore(localStorage.getItem('hangmanhighscore'));
        } else if (victoryCount > highscore){
            setHighscore(victoryCount);
            localStorage.setItem('hangmanhighscore', victoryCount);
        }
    }, [highscore, victoryCount])

    
    const getNewConstellation = useCallback(() => {
        const newConstellation = constellations[Math.floor(Math.random()*constellations.length)];
        if (newConstellation === previousConstellation) {
            return getNewConstellation();
        }
        const hint = newConstellation.split("").map((letter) => {
            if (letter === '-') {
                return '- '
            }
            return '_ ';
        }).join("");
        setPlayerHint(hint);
        setCurrentConstellation(newConstellation);
    }, [previousConstellation])
    
    const startGame = useCallback(() => {
        setGuessedLetters("");
        setGuessesLeft(11);
        getNewConstellation();
    }, [getNewConstellation]);

    const startUp = useCallback(() => {
        window.removeEventListener("keyup", startUp); //remove input element
        startGame();
    }, []);
    
    useEffect(() => {
        if (!currentConstellation) {
            return;
        }
        if(guessesLeft<=0){ //If 0 or fewer guesses left, LOSE
            setPreviousConstellation("galaxy");
            setVictoryCount(0);
            startGame();
        }
        if(!playerHint.includes("_")){ //If There are no '_' characters in the output, WIN
            setPreviousConstellation(currentConstellation);
            setVictoryCount(victoryCount + 1);
            startGame();
        }
    }, [currentConstellation, guessesLeft, playerHint, startGame, victoryCount]);

    useEffect(() => {
        if (!highscore || victoryCount > highscore) {
            checkHighScore();
        }
    }, [highscore, victoryCount, checkHighScore])

    const handleKeyPress = useCallback(({ code }) => {
        if(currentConstellation) {
            if(code.startsWith("Key")){
                verifyInput(code[3].toLowerCase())
            }
        } else {
            startUp();
        }
    }, [verifyInput, startUp]);

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);
        return () => {
            document.removeEventListener('keyup', handleKeyPress);
        }
    }, [handleKeyPress])

    return (
        <>
            <header>
                <h3>Current Streak: {victoryCount}</h3>
                <h5>Highest Streak:{highscore}</h5>
            </header>
            <img src={`/images/constellations/${previousConstellation ? previousConstellation : "galaxy"}.jpg`} id="themeRewardSpan" alt="The last word's corresponding constallation" />
            <div>
                <span id="wordSpan" onClick={startUp}>{currentConstellation ? "" : "Press Any Key, or Click Here to Begin"}</span>
                <span id="guessFeedbackSpan">{playerHint}</span>
            </div>
            <div>
                <span id="guessesLeftSpan">{guessesLeft ? `Guesses Left: ${guessesLeft}` : ""}</span><br/>
                <span id="verificationMessage">{verificationMessage ? verificationMessage: ""}</span>{verificationMessage && <br/>}
                <span id="guessedLettersSpan">{guessedLetters}</span>
            </div>
            <div>
                {currentConstellation && displayLetters.split("").map((letter, index) => {
                    return <input type="button" value={letter.toUpperCase()} key={index} disabled={guessedLetters.includes(letter)} onClick={() => verifyInput(letter)} />
                })}
            </div>
        </>
    )
}

export default ConstellationWordGuessGame;
