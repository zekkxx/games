import React from 'react';
import './style.css';

function Results(props){
    return(
        <>
            <h1>Results: {props.quiz.filter(({answer, guess})=>answer===guess).length}/{props.quiz.length} Correct!</h1>
            <div id="resultsDiv">
                {props.quiz.map(item=>(
                    <div className="imgContainer" key={item.answer}>
                        <img src={`/games/images/constellations/${item.answer}.jpg`}
                            className="resultsImg"
                            alt={`Constellation ${item.answer}`}
                        />
                        <span className="answer imgText">
                            {item.answer.toUpperCase()}
                        </span>
                        <span className={item.answer===item.guess ? "correct response imgText" : "wrong response imgText"}>
                            {item.guess ? item.guess.toUpperCase() : "No answer given"}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Results;