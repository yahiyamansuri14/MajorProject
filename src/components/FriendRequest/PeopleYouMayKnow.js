import axios from 'axios'
import React, { Component } from 'react'

export default class PeopleYouMayKnow extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loginToken:"",
             isClicked:false
        }
    }
    async componentDidMount(){
        let loginToken = await localStorage.getItem("logintkn")
        if (loginToken == null){
            this.props.history.push('/')
        }else{
            this.setState({loginToken:loginToken})
        }
    }    
    sendFriendRequest = () =>{
        console.log(this.props.user._id)
        axios.post(`http://localhost:3300/v1/user/sendfriendrequest/${this.props.user._id}`,{},{ headers:{token:this.state.loginToken}})
                .then( res =>{
                     let data = res.data
                     if (data.status != "OK"){
                         console.log("failed")
                     }else{
                         console.log("success")
                     }
                })
                .catch(err=>{
                    console.log(err)
                })
    }
    render() {
        return (
            <div className="container-fluid border mt-2" >
                <div className="d-flex flex-row">
                    <div>
                        <img
                            alt="monster"
                            /* src="https://robohash.org/2?set=set2&size=50x50" */
                            src={this.props.user.fileUrl}
                            height="50"
                            width="50"
                            className="rounded-circle"
                        ></img>
                    </div>
                    <div>
                    <span className="text-dark ml-3"><b>{this.props.user.firstName} {this.props.user.lastName}</b></span><br></br>
                    {/* <span className="text-dark ml-3">2 mututal friends</span> */}
                    </div>
                </div>
                <div className="d-flex flex-row">
                    <button
                        className="btn btn-primary p-1 ml-5"
                        onClick={this.sendFriendRequest}
                    >Add a Friend</button>
                    <button
                        className="btn btn-secondary p-1 ml-3"
                        
                    >Profile</button>
                    </div>
            </div>
        )
    }
}
