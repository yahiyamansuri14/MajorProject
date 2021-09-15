import axios from 'axios'
import React, { Component } from 'react'
import './post.style.css'
export default class Post extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             textContent:"",
             user_id:"",
             loginToken:"",
             selectedFile:null

        }
    }
    async componentDidMount(){
         let user_id = await localStorage.getItem("user_id")
         let loginToken = await localStorage.getItem("logintkn")
         this.setState({
             user_id:user_id,
             loginToken:loginToken
         })
    }
    handleFile = (e) =>{
        console.log(e.target.files)
        this.setState({
            selectedFile:e.target.files[0]
        })
    }
    handlePostSubmit = (e) =>{
        let formData = new FormData()
        console.log(this.state.selectedFile)
        formData.append('photo',this.state.selectedFile,this.state.selectedFile)
        /* formData.append('user_id',this.state.user_id) */
        formData.append('textContent',this.state.textContent)
        
        /* let { textContent, user_id,loginToken } = this.state
        let photo = this.state.selectedFile
        console.log(textContent,photo,user_id) */
        
        axios.post("http://localhost:3300/v1/post/savepost", formData , {headers:{token:this.state.loginToken}})
                .then( res =>{
                    let data = res.data
                    if (data.status != 'OK'){
                        console.log('image upload failed')
                        console.log(data.message)
                    }else{
                        console.log('success')
                        console.log(data.message)
                    }
                })
                .catch( err=>{
                    console.log(err)
                    console.log('failed in err')
                })
    }
    render() {
        return (
            <>
                <div className="container-fluid mt-3 post-container">
                    <div className="row">
                        <div className="col-2">

                        </div>
                        <div className="col-8 border p-3">
                            <div className="row">
                                <div className="col">

                                    <textarea
                                        className="input-box mt-3 border border-primary got-placeholder"
                                        placeholder="what's on your mind???"
                                        value={this.state.textContent}
                                        onChange={(e) =>{this.setState({ textContent:e.target.value})}}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                <input 
                                    type="file" 
                                    id="upload" 
                                    onChange={ (e) =>this.handleFile(e)}
                                    hidden/>
                                <label 
                                for="upload"
                                className="mt-2"
                                >Photo/Video</label>
                                {/*  <button
                                        id="buttonid"
                                        className="btn btn-success bg-success mt-2"
                                    >Photo/Video</button>  */}
                                </div>
                                <div className="col">
                                    {/* <button
                                        className="btn btn-secondary mt-2 bg-secondary"
                                    >Public</button> */}
                                </div>
                                <div className="col">
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={this.handlePostSubmit}
                                    >Post</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </>
        )
    }
}
