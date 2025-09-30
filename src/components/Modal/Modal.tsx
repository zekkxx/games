import './style.css'

import { useState } from 'react';

interface modalProps {
    buttonText?: string;
    title: string;
    content: string;
}

function Modal(props: modalProps){
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