import "./style.css";

import { Link } from "react-router-dom";
import React from 'react';

function Navbar(){
    return(
        <nav>
            <h2><Link to="/">K's Game Collection!</Link></h2>
            <ul>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;