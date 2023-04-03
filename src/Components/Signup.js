import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate() //useNavigate hook
    const { name, email, password } = credentials; //Destructuring.
    const handleSubmit = async (e) => {
        e.preventDefault(); //Prevents refresh.
        //Checking if user exists:
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json", //Header passed to the backend for authentication.

            },
            body: JSON.stringify({ name, email, password }), //Things passed to backend as body for authentication.
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Account created successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }) //Allows typing in the fields.
    }
    return (
        <div className='container mt-3'>
            <h2>Create an account to store your notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
