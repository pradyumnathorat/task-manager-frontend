import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./login.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setredirect] = useState(false);
    const url = process.env.REACT_APP_API;
    const HandleLogin = () => {
        if (email && password) {
            fetch(`${url}/`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res) => res.json()
            ).then((data) => {
                console.log(data);
                if (data.error) {
                    alert(data.error)
                } else {
                    localStorage.setItem("token", JSON.stringify(data.token))
                    localStorage.setItem("user", data.user)
                    setEmail("")
                    setPassword("")
                    alert(data.message)
                    setredirect(true);
                }
            })
        } else
            alert("Please Fill all Fields");
    }
    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/tasks" />
        }
    }

    return (
        <>
            {performRedirect()}
            <div className="login-container">
                <div className="login">
                    <div>
                        <h1>Login</h1>
                    </div>
                    <div>
                        <input className="login-input" type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    </div>
                    <div>
                        <input className="login-input" type="text" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    </div>
                    <div>
                        <button className="login-b" onClick={HandleLogin}>Login</button>
                    </div>
                    <div>
                        <Link to="/register" ><p className="signup" >Sign Up</p></Link>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login