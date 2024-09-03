import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);

    const [currentStatus, setCurrentStatus] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currentStatus === "Login") {
            newUrl += "/api/user/login";
        }else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }else{
            alert(response.data.message);
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentStatus}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentStatus === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                    <button type='submit'>{currentStatus === "Sign Up" ? "Create an account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use and privacy policy.</p>
                    </div>
                    {currentStatus === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrentStatus("Sign Up")}>Sign Up</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrentStatus("Login")}>Login</span></p>}


                </div>
            </form>
        </div>
    )
}

export default LoginPopup