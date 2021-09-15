import React, { Component } from 'react'
import FreindUpperProfile from '../components/FriendRequest/FreindUpperProfile'
import PeopleYouMayKnow from '../components/FriendRequest/PeopleYouMayKnow'
import NavBar from '../components/NavigationBar/NavBar'
import UserProfile from '../components/UserProfile/UserProfile'
import PostShow from '../components/PostShow/PostShow'
import axios from 'axios'
export default class FriendsPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginToken:"",
            users:[],
            friendRequests:[],
            isClicked:false
        }
    }
    async componentDidMount(){
        let loginToken = await localStorage.getItem("logintkn")
        if (loginToken == null){
            this.props.history.push('/')
        }else{
            this.setState({loginToken:loginToken})
            //get people you may know
            axios.post('http://localhost:3300/v1/user/getalluser',{}, {headers:{token:loginToken}})
                    .then(res=>{
                        let data = res.data
                        if (data.status != "OK"){
                            console.log('falied to get user data')
                        }else{
                            let users = data.data
                            this.setState({users:users})
                            /* console.log(this.state.users) */
                        }
                    })
        }
        //get all friend requests
        axios.post('http://localhost:3300/v1/user/getallfriendrequest',{}, {headers:{token:loginToken}})
                .then(res=>{
                    console.log("in friend requests")
                    console.log(res)
                    this.setState({friendRequests:res.data.data})
                    console.log(this.state.friendRequests)
                })
                .catch(err=>{
                    console.log(err)
                })
    }
    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="row mt-3">
                    <div className="col-3">
                        <h4><b>Friend Requests</b></h4>{console.log(this.state.friendRequests)}
                        { 
                            
                        this.state.friendRequests.map( user =>{
                            return (<FreindUpperProfile user={user}></FreindUpperProfile>)
                        })}
                        <FreindUpperProfile></FreindUpperProfile>
                        <FreindUpperProfile></FreindUpperProfile>
                        <FreindUpperProfile></FreindUpperProfile>
                        <b  className="mb-2">People you may know</b>
                        {this.state.users.map( user =>{
                            return (<PeopleYouMayKnow
                                 user={user}>
                                 </PeopleYouMayKnow>)
                        })}
                        
                    </div>
                    <div className="col-8">
                        <UserProfile></UserProfile>
                        <div className="row ml-4">
                            <div className="col-5 border">

                            </div>
                            <div className="col-7">
                                <div className="row">
                                    <div className="col-12 border">
                                        <span style={{"margin":"100px"}}>POST</span>
                                        {/* <h4 style={{"margin-left":"30px","margin-top":"30px"}}>POST</h4> */}
                                        {/* <PostShow></PostShow> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
