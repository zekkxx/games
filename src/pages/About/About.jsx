import "./style.css";

import React from 'react';

function About(){
    return(
        <main>
            <h1>About This Collection</h1>
            <div className="breakbar"></div>
            <p>
                This collection of games are designed as React implementations of standard JavaScript games and activities. These were originally separate repositories and pages, but because I enjoy playing these games myself, I wanted to store them all in one location and make navigation between them all easier.
            </p>
            <p>
                All of these games, images, and the source code for this page itself are Open Source, and available under the Unliscense. It's pretentious to think that anything I did in here is particularly noteworthy, or unique. This content was all made as parts of my journey learning JavaScript and React - and if it can help someone else to learn by dissecting or using this code themselves, I'd love for that to happen.
            </p>
            <p>
                We will be coming out with additional games soon!
            </p>
        </main>
    )
}

export default About;
