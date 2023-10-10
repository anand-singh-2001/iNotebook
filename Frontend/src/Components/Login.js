import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Checking if user exists:
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json", //Header passed to the backend for authentication.

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }), //Things passed to backend as body for authentication.
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken) //saving the users authtoken as token in localStorage.
            props.showAlert("Login Successful", "success")
            navigate("/")

        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }) //Allows typing in the fields.
    }
    return (
        <div mt-3="true">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}> {/**onSubmit function is placed in form tag not button */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" onChange={handleChange} id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={handleChange} id="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
