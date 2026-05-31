import "./style.css";

import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav>
            <h2><Link to="/">arKade</Link></h2>
            <ul>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;