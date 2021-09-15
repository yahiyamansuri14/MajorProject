import React, { Component } from 'react'
import './login.style.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userLogin: "",
            pwd: ""
        }
    }
    login = () => {
        let { userLogin, pwd } = this.state
        let loginURL = 'http://localhost:3300/v1/user/login'
        axios.post(loginURL, { userLogin, pwd })
            .then(async (res) => {
                let data = res.data
                if (data.status != "OK") {
                    toast(data.message)
                } else {
                    let token = data.data.token
                    let user_id = data.data.user._id
                    await localStorage.setItem("logintkn", (token))
                    await localStorage.setItem("user_id",user_id)
                    window.location = "/feed"
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container align-middle mt-5 login-container">
                <ToastContainer position="top-center" />
                <p className="login-text">We help you to connect and share with people in your life...</p>
                <div className="row form-group">
                    <input
                        type="text"
                        placeholder="Email address or Mobile no"
                        className="form-control mt-3"
                        value={this.state.userLogin}
                        onChange={
                            e => { this.setState({ userLogin: e.target.value }) }
                        }
                    ></input>
                    <input
                        type="password"
                        placeholder="password"
                        className="form-control mt-3"
                        value={this.state.pwd}
                        onChange={
                            e => { this.setState({ pwd: e.target.value }) }
                        }
                    ></input>
                    <button
                        className="btn btn-primary btn-block mt-3 login-button"
                        onClick={this.login}
                    ><span className="login-btn-text">Log In</span></button>
                    <span className="text-right mt-3 text-primary">forget password?</span>
                </div>
            </div>
        )
    }
}
