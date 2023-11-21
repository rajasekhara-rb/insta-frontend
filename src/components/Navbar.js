import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            {/* <div className="nav-wrapper white">
                <Link to="/" className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Login</Link></li>
                    <li><Link to="/signup">Register</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">CreatePost</Link></li>
                </ul>
            </div> */}

            <nav>
                <div class="nav-wrapper">
                    <a href="/" class="brand-logo">Logo</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="/">Sass</a></li>
                        <li><a href="/">Components</a></li>
                        <li><a href="/">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        </nav>
    )
};

export default Navbar;