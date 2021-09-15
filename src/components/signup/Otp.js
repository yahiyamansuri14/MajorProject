import React, { Component } from 'react'
import '../login/login.style.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Otp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            userLogin: "",
            pwd: "",
            gender: "",
            otp: "",
            dob:""
        }
    }

    signup = () => {
        let { firstName, lastName, userLogin, pwd, gender, dob,otp } = this.state
        console.log(firstName, lastName, userLogin, pwd, gender, dob,otp)
        let loginURL = 'http://localhost:3300/v1/user'
        axios.post(loginURL+'/signup',{firstName,lastName,userLogin,pwd,gender,dob,otp})
                .then(res=>{
                   let data = res.data 
                   if (data.status != "OK"){
                       console.log(data)
                       toast("pls enter right OTP or try after some time")
                   }else{
                       console.log(data.msg)
                       toast(data.msg)
                       window.location = '/'
                   }
                })
                .catch(err=>{
                    console.log(err)
                })
    }
    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            userLogin: user.userLogin,
            pwd: user.pwd,
            gender: user.gender,
            dob:user.date
        })
    }
    render() {
        return (
            <>
                <div className="container-fluid otp-container">
                    <div className="container align-middle mt-5 login-container">
                    <ToastContainer position="top-center" />
                        <div className="row">
                            <span className="login-text">Pls enter a 6 digit OTP sent to your email...</span>
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={this.state.otp}
                                onChange={e => { this.setState({ otp: e.target.value }) }}
                            ></input>
                            <button
                                className="btn btn-primary btn-block mt-3 login-button"
                                onClick={this.signup}
                            ><span className="login-btn-text">SignUp</span></button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
