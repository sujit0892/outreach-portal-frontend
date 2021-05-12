import React from 'react'
import {Router, Route} from 'react-router-dom'
import Home from './Component/Home'
import Login from './Component/Login'
import {createBrowserHistory} from 'history';
import ViewPost from './Component/ViewPost'
import Project from './Component/Project'
import Notification from './Component/Notification'
import Profile from './Component/Profile'
import EditProfile from './Component/EditProfile'
import Message from './Component/messages'
export const history = createBrowserHistory();


function App() {

  return (
      <Router history={history}>
                  <Route exact path='/' component={Login}></Route>
                  <Route exact path='/login' component={Login}></Route>
                  <Route exact path='/home' component={Home}></Route>
                  <Route exact path='/viewPost' component={ViewPost}></Route>
                  <Route exact path='/project' component={Project}></Route>
                  <Route exact path='/notification' component={Notification}></Route>
                  <Route exact path='/profile' component={Profile}></Route>
                  <Route exact path='/editprofile' component={EditProfile}></Route>
                  <Route exact path='/messages' component={Message}></Route>
      </Router>

    );
}

export default App;
