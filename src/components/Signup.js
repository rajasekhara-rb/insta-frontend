import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BaseUrlContext } from '../App';

const Signup = () => {
    const navigate = useNavigate();
    const baseUrl = useContext(BaseUrlContext);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const PostData = () => {
        if (!name || !email || !password) {
            toast.error("Please fill all details")
            return;
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

        if (!email.match(emailRegex)) {
            toast.error("Invalid Email format", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        if (!password.match(passwordRegex)) {
            toast.error("Invalid password Format", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        axios.post(`${baseUrl}/user/signup`, {
            name,
            email,
            password
        })
            .then((res) => {
                const data = res.data;
                if (data.error) {
                    toast.error("Error")
                } else {
                    toast.success(res.data.message);
                    navigate("/signin")
                }
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }

    return (
        <div className='mycard'>
            <div className='card input-field logindiv'>
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn waves-effect waves-light #448aff blue accent-2"
                    type="submit"
                    name="action"
                    onClick={() => PostData()}//calling PostData function when the button is clicked
                >Register</button>

                <h6>
                    <Link to="/signin">Already having an account?</Link>
                </h6>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;