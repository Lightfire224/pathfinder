import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Nav = props => {
    /**
     * TODO:
     * For each div below, decide if it should navigate the user to a specific page
     * Then, use the tools from React Router so when the user clicks on the text, it navigates them to that path
     */
    return (
        <div className="simple-flex-row">
            <div>AlgoMagic</div>
            <Link to="/algoway"> <div>Algoway</div> </Link>
            <Link to="/algorhythm"><div>AlgoRhythm</div></Link>
            <Link to="/algorithms"><div>Saved Algos</div></Link>

            {/* <div className="simple-flex-row right-corner">
                <Link to="/login"><div>Login</div></Link>
                <Link to="/help"><div>?</div></Link>
            </div> */}
        </div>
    )
}

export default Nav;