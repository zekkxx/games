import './style.css'

import React, { useState } from 'react';

function Modal(props){
    const [displayState, setDisplayState] = useState(false);
    return(
        <>
            <input type="button" value={props.buttonText ? props.buttonText : "Open Modal"} onClick={() => setDisplayState(true)}/>
            {displayState ?
            (<>
                <div className="cover" onClick={() => setDisplayState(false)}></div>
                <article className="modalContent">
                        <h2>{props.title}</h2>
                        <div className="breakBar"></div>
                        <p>{props.content}</p>
                </article>
            </>)
            : null}
        </>
    )
}

export default Modal;