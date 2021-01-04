import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function Library(){
    return(
        <main>
            <h1>Game Listings:</h1>
            <div className="breakbar"></div>
            <section>
                <h2>Constellation Collection:</h2>
                <ul>
                    <li><Link to="/game/memory">Constellation Memory</Link></li>
                    <li><Link to="/game/trivia">Constellation Trivia</Link></li>
                    <li><Link to="/game/word-guess">Constellation Word Guess</Link></li>
                </ul>
            </section>
        </main>
    )
}

export default Library;