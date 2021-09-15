import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../components/login/Login'
import './home.style.css'
import Signup from '../components/signup/Signup'
import axios from 'axios'

const appContext = React.createContext()

export default class home extends Component {
    constructor(props) {
        super(props)

        this.state = {
                user:{}
        }
    }
    
    getDataFromSignUp = (signUpData) =>{
            this.setState({user:signUpData})
            console.log(signUpData)
    }

    render() {
        return (
            <>
                <div className="container-fluid bg-primary header-container">
                    <span className="project-title">Project Title</span>
                </div>
                    {console.log(this.state.user  )}
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-6">
                            <Login></Login>
                        </div>
                        <div className="col-md-6">
                            
                                <Signup value={this.getDataFromSignUp}></Signup>
                           
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
