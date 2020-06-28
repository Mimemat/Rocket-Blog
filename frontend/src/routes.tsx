import React from 'react'
import {BrowserRouter as Router, Route, } from 'react-router-dom'

import Landing from './pages/Landing'
import Post from './pages/Post'
import LogIn from './pages/Login'
import Create from './pages/Create'

const Routes: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/login" component={LogIn}/>
      <Route path="/post/:id" component={Post}/>
      <Route exact path="/create" component={Create}/>
    </Router>
  )
}
export default Routes