import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {

    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const renderList = () => {
        if (state) {
            return (
                <>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">CreatePost</Link></li>
                    <li>
                        <button className="btn waves-effect waves-light #00e676 green accent-3" type="submit" name="action"
                            onClick={() => {
                                localStorage.clear();
                                dispatch({ type: "CLEAR" });
                                navigate("/signin");
                            }}>
                            Logout
                        </button>
                    </li>
                </>
            )
        } else {
            return (
                <>
                <li><Link to="/signin">Login</Link></li>
                <li><Link to="/signup">Register</Link></li>
                    {/* <li><a href="/signin">Login</a></li> */}
                    {/* <li><a href="/signup">Register</a></li> */}
                </>
            )
        }
    }

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
                <div class="nav-wrapper white">
                    <a href="/" class="brand-logo">Instagram</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        {renderList()}
                        {/* <li><a href="/signin">Login</a></li>
                        <li><a href="/signup">Register</a></li>
                        <li><a href="/create">Create Post</a></li> */}
                    </ul>
                </div>
            </nav>
        </nav>
    )
};

export default Navbar;