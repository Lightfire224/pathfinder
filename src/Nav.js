import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./nav.css"
import AlgoMagicLogo from "./AlgoMagic.png"

const Nav = props => {

    return (
        <div id="nav-full-width">
            <div id="nav-menu">
                <div><img className="AlgoMagic" src={AlgoMagicLogo}></img></div>
                <Link to="/algoway"> <div className="NavButton">Algoway</div> </Link>
                <Link to="/algorhythm"><div className="NavButton">AlgoRhythm</div></Link>
                <Link to="/algorithms"><div className="NavButton">Saved Algos</div></Link>
            </div>
        </div>
    )
}

export default Nav;