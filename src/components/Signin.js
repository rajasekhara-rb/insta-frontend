import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Signin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const PostData = () => {
        if (!email || !password) {
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


        axios.post("http://localhost:5234/user/signin", {
            email,
            password
        },
            {
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            },

        )
            .then((res) => {
                const data = res.data;
                // console.log(data)
                if (data.error) {
                    toast.error("Error")
                } else {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user))
                    toast.success(res.data.message);
                    setTimeout(() => {
                        navigate("/")
                    }, 2000);
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
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #448aff blue accent-2"
                    type="submit"
                    name="action"
                    onClick={() => PostData()}
                >Login
                </button>
                <h6>
                    <Link to="/signup">Don't have an account?</Link>
                </h6>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signin;