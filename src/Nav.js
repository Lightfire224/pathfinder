import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./nav.css"
import AlgoMagicLogo from "./AlgoMagic.png"
import AlgoWayLogo from "./AlgoWay.png"
import AlgoRhythmLogo from "./AlgoRhythm.png"
import AlgoSavedLogo from "./SavedAlgos.png"

const Nav = props => {

    return (
        <div id="nav-full-width">
            <div id="nav-menu">
                <div><img className="AlgoMagic" src={AlgoMagicLogo}></img></div>
                <Link to="/algoway"> <img className="AlgoWay" src={AlgoWayLogo}></img></Link>
                <Link to="/algorhythm"><img className="AlgoWay" src={AlgoRhythmLogo}></img></Link>
                <Link to="/algorithms"><img className="AlgoSavedLogo" src={AlgoSavedLogo}></img></Link>
            </div>
        </div>
    )
}

export default Nav;