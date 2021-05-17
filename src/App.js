import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Component/Home'
import Login from './Component/Login'
import Course from './Component/Course'
import ViewPost from './Component/ViewPost'
import Project from './Component/Project'
import Notification from './Component/Notification'
import Profile from './Component/Profile'
import EditProfile from './Component/EditProfile'
import Messages from './Component/message'
import Search from './Component/Search'
import Group from './Component/Group'




function App() {

  return (
      <Router>
        <Switch>
                  <Route exact path='/' component={Login}></Route>
                  <Route exact path='/login' component={Login}></Route>
                  <Route exact path='/home' component={Home}></Route>
                  <Route exact path='/viewPost' component={ViewPost}></Route>
                  <Route exact path='/project' component={Project}></Route>
                  <Route exact path='/notification' component={Notification}></Route>
                  <Route exact path='/profile' component={Profile}></Route>
                  <Route exact path='/editprofile' component={EditProfile}></Route>
                  <Route exact path='/search' component={Search}></Route>
                  <Route exact path='/course/:id' component={Course}></Route>
                  <Route exact path='/message' component={Messages}></Route>
                  <Route exact path='/group/:id' component={Group}></Route>

        </Switch>
      </Router>

    );
}

export default App;
