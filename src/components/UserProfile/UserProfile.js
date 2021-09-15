import React, { Component } from 'react';
import './userprofile.style.css'
class UserProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginToken:"",
            user:{}
        }
    }
    async componentDidMount(){
          let loginToken = await localStorage.getItem("logintkn")       
          if (loginToken == null){
              this.props.history.push("/")
          }else{

          }
    }
    render() {
        return (
            <div className="container-fluid border profile-container">
                <div className="row">
                    <div className="col">
                        <img
                            alt="monster"
                            src="https://robohash.org/2?set=set2"
                        /* &&size=500x500 */
                        ></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h2 className="text-center">Yahiya Mansuri</h2>
                        <h4 className="text-center text-primary">Yahiya Mansuri is a good boy</h4>
                        <hr></hr>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6   ">
                        <div className="d-flex justify-content-between">
                            <div className="text-secondary child-div">Posts</div>
                            <div className="text-secondary child-div">About</div>
                            <div className="text-secondary child-div">Friends</div>
                            <div className="text-secondary child-div">Photos</div>
                            <div className="text-secondary child-div">Videos</div>

                        </div>
                    </div>
                    <div className="col-6 d-flex">
                        <button
                            className="btn btn-primary p-2 ml-3"
                        >Add Friend</button>
                        <button
                            className="btn btn-secondary p-2 ml-3"
                        >Message</button>
                        <button
                            className="btn btn-secondary p-2 ml-3"
                        >Block</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;