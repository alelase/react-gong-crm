import PropTypes from 'prop-types'
import Button from './Button'
import logo from '../logo.svg'
import './Header.css'
import {BrowserRouter, Link} from "react-router-dom";
import React from "react";
const Header = ({title, isUserAuthenticated, deauthenticate}) => {

    const onClick = (e) => {
        console.log("On Click!", e);
    };

    //let location = useLocation()
    //console.log(location.pathname);

    return (

        <div className="header-container">
            <div className="logo-container"><img src={logo} /></div>
            <div className="menu">
                <div className="title">{title}</div>
                {!isUserAuthenticated?
                            <div>
                                {/* <a href="/login">Login</a>*/}
                            </div>
                :
                    <div>
                    <span className="logged-user">Hi!</span>
                        <BrowserRouter>
                            <Link from='/account' to="/login" onClick={deauthenticate}>Logout</Link>
                        </BrowserRouter>
                    </div>
                }

            </div>
        </div>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


export default Header