import React from 'react'
import {BrowserRouter as Router, Route, } from 'react-router-dom'

import Landing from './pages/Landing'
import Post from './pages/Post'
import LogIn from './pages/Login'
import Create from './pages/Create'
import SignUp from './pages/SignUp'
import User from './pages/User'

const Routes: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/login" component={LogIn}/>
      <Route path="/post/:id" component={Post}/>
      <Route path="/user/:userName" component={User}/>
      <Route exact path="/create" component={Create}/>
      <Route exact path="/signup" component={SignUp}/>
    </Router>
  )
}
export default Routes