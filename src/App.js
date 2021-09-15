import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home'
import Otp from './components/signup/Otp'
import Feed from './pages/Feed'
import FreindUpperProfile from './components/FriendRequest/FreindUpperProfile';
import FriendsPage from './pages/FriendsPage';
import UserProfile from './components/UserProfile/UserProfile';
import LoginUserProfile from './components/UpdateProfile/LoginUserProfile';
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/otp" component={Otp} ></Route>
        <Route path="/" component={Home} exact></Route>
        <Route path="/feed" component={Feed}></Route>
        <Route path="/friends" component={FriendsPage}></Route>
        <Route path="/userprofile" component={UserProfile}></Route>
        <Route path="/loginuserprofile" component={LoginUserProfile}></Route>
      </Router>
    );
  }
}

export default App;