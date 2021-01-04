import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";

function Navbar(){
    return(
        <nav>
            <h2><Link to="/">K's Game Collection!</Link></h2>
            <ul>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;