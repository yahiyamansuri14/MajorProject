import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavigationBar/NavBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './loginuser.style.css'
import { formatMs } from '@material-ui/core';
export default class LoginUserProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             firstName:"",
             lastName:"",
             userLogin:"",
             gender:"",
             dob:"",
             bio:"",
             currentTown:"",
             homeTown:"",
             school:"",
             university:"",
             rel_status:"",
             loginToken:"",
             selectedFile:null
        }
    }
    handleFile = (e) =>{
        this.setState({selectedFile:e.target.files[0]})
    }
    handleUpdate = () =>{
        let formData = new FormData()
        if (this.state.selectedFile != null){
            formData.append('photo', this.state.selectedFile, this.state.selectedFile)
        }
        formData.append('firstName', this.state.firstName)
        formData.append('lastName', this.state.lastName)
        formData.append('userLogin', this.state.userLogin)
        formData.append('gender', this.state.gender)
        formData.append('dob', this.state.dob)
        formData.append('bio', this.state.bio)
        formData.append('currentTown', this.state.currentTown)
        formData.append('homeTown', this.state.homeTown)
        formData.append('school', this.state.school)
        formData.append('university', this.state.university)
        formData.append('rel_status', this.state.rel_status)
        

        axios.post('http://localhost:3300/v1/user/updateuserprofile', formData, {headers:{token:this.state.loginToken}})
                .then(res=>{
                    let data = res.data
                    if (data.status != "OK"){
                        console.log("failed to update profile")
                    }
                    console.log(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })

    }
    async componentDidMount(){
        let loginToken = await localStorage.getItem("logintkn")
        if (loginToken == null){
            window.location="/"
        }else{
            this.setState({loginToken:loginToken})
            axios.post('http://localhost:3300/v1/user/getuserprofilebyid', {}, {headers:{token:loginToken}})
                    .then(res=>{
                        let data = res.data
                        if (data.status != 'OK'){
                            console.log(data.message)
                        }else{
                            let data = res.data.data
                            this.setState({
                                firstName:data.firstName,
                                lastName:data.lastName,
                                userLogin:data.userLogin,
                                dob:data.dob,
                                gender:data.gender,
                                bio:data.bio,
                                currentTown:data.currentTown,
                                homeTown:data.homeTown,
                                school:data.school,
                                university:data.university,
                                rel_status:data.rel_status
                            })
                            console.log(data)
                        }
                    })
        }
    }
    render() {
        return (
            <>
                <NavBar></NavBar>
                <ToastContainer position="top-center" />
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 mt-5">
                        <h3>User Details</h3>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    placeholder="firstName"
                                    className="form-control mt-3"
                                    value={this.state.firstName}
                                    onChange={(e)=>{this.setState({firstName:e.target.value})}}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="abc@gmail.com"
                                    className="form-control mt-3"
                                    value={this.state.userLogin}
                                    disabled
                                    onChange={(e)=>{this.setState({userLogin:e.target.value})}}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="date of birth"
                                    className="form-control mt-3"
                                    value={this.state.dob.substr(0,10)}
                                    disabled
                                    onChange={(e)=>{this.setState({dob:e.target.value})}}
                                ></input>
                                <h3 className="mt-5">Address</h3>
                                <input
                                    type="text"
                                    placeholder="Current Town"
                                    className="form-control mt-3"
                                    value={this.state.currentTown}
                                    onChange={(e)=>{this.setState({currentTown:e.target.value})}}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="School"
                                    className="form-control mt-3"
                                    value={this.state.school}
                                    onChange={(e)=>{this.setState({school:e.target.value})}}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="relationship status"
                                    className="form-control mt-3"
                                    value={this.state.rel_status}
                                    onChange={(e)=>{this.setState({rel_status:e.target.value})}}
                                ></input>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    placeholder="lastName"
                                    className="form-control mt-3"
                                    value={this.state.lastName}
                                    onChange={(e)=>{this.setState({lastName:e.target.value})}}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="gender"
                                    className="form-control mt-3"
                                    value={this.state.gender}
                                    onChange={(e)=>{this.setState({gender:e.target.value})}}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="bio"
                                    className="form-control mt-3"
                                    value={this.state.bio}
                                    onChange={(e)=>{this.setState({bio:e.target.value})}}
                                ></input>
                                <h3 className="mt-5 hidden">Address</h3>
                                <input
                                    type="text"
                                    placeholder="Home Town"
                                    className="form-control mt-3"
                                    value={this.state.homeTown}
                                    onChange={(e)=>{this.setState({homeTown:e.target.value})}}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="University"
                                    className="form-control mt-3"
                                    value={this.state.university}
                                    onChange={(e)=>{this.setState({university:e.target.value})}}
                                ></input>
                                <input
                                    type="file"
                                    id="upload"
                                    onChange={(e) => this.handleFile(e)}
                                    hidden />
                                <label
                                    for="upload"
                                    className="mt-3"
                                >Profile Picture</label>
                            </div>
                        </div>
                        <button
                            className="btn btn-block btn-primary mt-3"
                            onClick={this.handleUpdate}
                        >Update...</button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </>
        )
    }
}
