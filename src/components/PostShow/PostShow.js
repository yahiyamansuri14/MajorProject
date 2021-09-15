import React, { Component } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ChatIcon from '@material-ui/icons/Chat'
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default class PostShow extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loginToken:""
        }
    }
    
    async componentDidMount(){
        let loginToken = await localStorage.getItem("logintkn")
        this.setState({ loginToken:loginToken})
    }
    handleLike = () =>{
        let id=this.props.post._id
        console.log(this.state.loginToken)
        console.log(id)
        axios.post(`http://localhost:3300/v1/post/likepost/${id}`,{}, {headers:{token:this.state.loginToken}})
                .then( res =>{
                    let data = res.data
                    if(data != "OK"){
                        toast(data.message)     
                    }else{
                        toast(data.message)
                    }
                })
                .catch( err=>{
                    console.log(err)
                    toast("pls try again letter...")
                })
    }
    handleDislike = () =>{
        let id=this.props.post._id
        console.log(this.state.loginToken)
        console.log(id)
        axios.post(`http://localhost:3300/v1/post/dislikepost/${id}`,{}, {headers:{token:this.state.loginToken}})
                .then( res =>{
                    let data = res.data
                    if(data != "OK"){
                        toast(data.message)
                    }else{
                        toast(data.message)
                    }
                })
                .catch( err=>{
                    console.log(err)
                    toast("pls try again letter...")
                })
    }
    render() {
        return (
            <div className="p-3">
                <ToastContainer position="top-center" />
                <div className="row mt-3 ">
                    <div className="col-2"></div>
                    <div className="col-8 border p-3">
                        <div className="row ">
                            <div className="d-flex flex-row">
                                <div>
                                    <img
                                        alt="monster"
                                        src="https://robohash.org/2?set=set2&size=50x50"
                                        className="rounded-circle"
                                    ></img>
                                </div>
                                <div> <span className="text-dark ml-3"><b>{ this.props.post.username}</b></span><br></br>
                                    <span className="text-dark ml-3 mb-3"><b>{this.props.post.createdAt.substr(0,10)}</b></span><br></br></div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <span>{this.props.post.textContent}</span>
                            <br></br>
                            <img
                                alt="monster"
                                /* src="https://robohash.org/2?set=set2" */
                                src={this.props.post.fileUrl}
                                width="400"
                                height="300"
                                className="border mt-3"
                            ></img>
                            <hr></hr>
                        </div>
                        <div className="row mt-2">
                            <hr style={{ 'width': '2px' }}></hr>
                            <div className="col d-flex justify-content-between">
                                <span className="text-secondary">{this.props.post.likes_person.length}likes</span>
                                <span className="text-secondary">{this.props.post.dislike_person.length}dislikes</span>
                                <span className="text-secondary">10 comments</span>
                                <span className="text-secondary">10 shares</span>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className=" col d-flex justify-content-between">

                                <ThumbUpAltIcon
                                    fontSize="large"
                                    style={{ 'color': '#0275d8' }}
                                    onClick={this.handleLike}
                                ></ThumbUpAltIcon>


                                <ThumbDownIcon
                                    fontSize="large"
                                    style={{ 'color': '#0275d8' }}
                                    onClick={this.handleDislike}
                                ></ThumbDownIcon>

                                <ChatIcon
                                    fontSize="large"
                                    style={{ 'color': '#0275d8' }}
                                ></ChatIcon>
                                <ScreenShareIcon
                                    fontSize="large"
                                    style={{ 'color': '#0275d8' }}
                                ></ScreenShareIcon>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>

                </div>
            </div>
        )
    }
}
