import React, { Component } from 'react'
import './signup.style.css'
import axios from 'axios'

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            userLogin: "",
            pwd: "",
            date:"",
            gender: ""
        }
    }

    signup = () => {
        let { firstName, lastName, userLogin, pwd, date, gender } = this.state
        let user = { firstName, lastName, userLogin, pwd, date, gender }
        localStorage.setItem('user', JSON.stringify(user))
        let loginURL = 'http://localhost:3300/v1/user'
        console.log('in signup')
        axios.post(loginURL + '/sentotp', { userLogin })
            .then(res => {
                let data = res.data
                if (data.status == 'OK') {
                    window.location = '/otp'
                } else {
                    window.location = '/'
                }
            })
            .catch(err => {
                console.log("there is some error while processing request", err)
            })

    }

    render() {
        return (
            <>
                <div className="container align-middle mt-5 signup-container">
                    <p className="login-text">SignUp its free</p>
                    <div className="form-row">
                        <div className="col">
                            <input
                                type="text"
                                placeholder="first name"
                                className="form-control mt-3"
                                value={this.state.firstName}
                                onChange={e => { this.setState({ firstName: e.target.value }) }}
                            ></input>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                placeholder="last name"
                                className="form-control mt-3"
                                value={this.state.lastName}
                                onChange={e => { this.setState({ lastName: e.target.value }) }}
                            ></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <input
                                type="text"
                                placeholder="email address or mobile no"
                                className="form-control mt-3"
                                value={this.state.emailOrMobile}
                                onChange={e => { this.setState({ userLogin: e.target.value }) }}
                            ></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <input
                                type="password"
                                placeholder="new password"
                                className="form-control mt-3"
                                value={this.state.pwd}
                                onChange={e => { this.setState({ pwd: e.target.value }) }}
                            ></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <input
                                type="date"
                                className="form-control mt-3 "
                                value={this.state.date}
                                onChange={e => { this.setState({ date: e.target.value }) }}
                            ></input>
                        </div>
                        <div className="col">
                            <select
                                className="form-control mt-3"
                                value={this.state.gender}
                                onChange={e => { this.setState({ gender: e.target.value }) }}
                            >
                                <option value="female">FeMale</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-block mt-3 login-button"
                        onClick={this.signup}
                    ><span className="login-btn-text">Sign Up</span></button>
                </div>
            </>
        )
    }
}
