import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {

    const [currentStatus, setCurrentStatus] = useState("Sign Up");

    return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentStatus}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentStatus==="Login"?<></>:<input type="text" placeholder='Your name' required />}
                    <input type="email" placeholder='Your email' required />
                    <input type="password" placeholder='Password' required />
                    <button>{currentStatus==="Sign Up"?"Create an account":"Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use and privacy policy.</p>
                    </div>
                    {currentStatus==="Login"
                    ?<p>Create a new account? <span onClick={()=>setCurrentStatus("Sign Up")}>Sign Up</span></p>
                    :<p>Already have an account? <span onClick={()=>setCurrentStatus("Login")}>Login</span></p>}
                    
                    
                </div>
            </form>
        </div>
    )
}

export default LoginPopup