import Post from '../components/Post/Post'
import React, { Component } from 'react'
import NavBar from '../components/NavigationBar/NavBar'
import './feed.style.css'
import PostShow from '../components/PostShow/PostShow'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default class Feed extends Component {
    
    
    async componentDidMount(){
        let loginToken = await (localStorage.getItem("logintkn"))
        /* console.log('in feed js',loginToken) */
        if ( loginToken == null){
            //window.location = "/"
            this.props.history.push('/')
            
            //return
        }else{
            console.log(loginToken)
            this.setState({loginToken:loginToken})
            axios.post('http://localhost:3300/v1/post/getallpost',{}, { headers:{token:loginToken}})
                .then(async res=>{
                    /* console.log(res)
                    let data = res.data
                    console.log(data) */
                    let data = res.data
                    if (data.status != "OK"){
                        
                        await toast("request invalid!!!try again letter")
                        window.location = "/"
                        /* console.log(data) */
                    }else{
                        let data = res.data.data
                        /* console.log(data) */
                        this.setState({posts:data})
                        toast("welcome")
                    }
                })
                .catch(err=>{
                    console.log(err)
                    console.log("there is some error!!!pls refresh the page")
                })
        }
        
    }
    constructor(props) {
        super(props)
    
        this.state = {
             posts:[],
             loginToken:""
        }
    }
    
    render() {
        return (
            <>
                <NavBar></NavBar>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <Post></Post>   
                         {
                             
                         this.state.posts.map( post =>{
                             return (<PostShow 
                                post={post}
                                key={post._id}
                                ></PostShow>)
                         })}
                        
                    </div>
                    <div className="col-3"></div>
                </div>
            </>
        )
    }
}
