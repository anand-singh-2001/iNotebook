// import React, { useContext, useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
// import noteContext from '../Context/notes/notesContext'


const About = () => {

    return (
        <div  >
            <h1 className='container mb-3' style={{ textAlign: 'center' }}>Welcome to iNotebook </h1>

            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" style={{ height: '600px', width: '800px', margin: 'auto' }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" >
                    <div className="carousel-item active" data-bs-interval="3000" >
                        <img src="https://images.unsplash.com/photo-1505940545481-2cac7ae15782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" className="d-block w-100" style={{ height: '100%', width: '100%' }} alt="Unable to load image" />
                        <div className="carousel-caption d-none d-md-block" style={{ color: 'white' }}>
                            <h5>Add your TODO list</h5>
                            <p>Add the tasks that are important and might slip your mind.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://images.unsplash.com/photo-1497681883844-82b4f0a359a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="d-block w-100" style={{ height: '100%', width: '100%' }} alt="Unable to load image" />
                        <div className="carousel-caption d-none d-md-block" style={{ color: 'white' }}>
                            <h5>Your office files</h5>
                            <p>Your office files are safe with us and can be retrived whenever you wish to.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000" >
                        <img src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" className="d-block w-100" style={{ height: '100%', width: '100%' }} alt="Unable to load image" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Notes close to your heart</h5>
                            <p>Things that you want to keep forever.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="alert alert-primary" role="alert" style={{ display: 'inline-block', width: '600px', marginLeft: '370px' }} >
                <Link to="/signup" className="alert-link" style={{ marginLeft: '220px', fontSize: '1.5rem', textDecoration: 'none' }}>Signup</Link>
                <h6>Add all you want to, we'll make sure it stays between us.Our databases are secure enough to protect your personal info and your files.</h6>
                <strong>We are excellent with keeping secrets.</strong>
            </div>
        </div >
    )
}

export default About
