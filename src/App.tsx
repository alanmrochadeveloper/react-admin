import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Header from './components/Header'
import Main from './components/Main'
import Emails from './pages/Emails'
import { mockUsers } from './Mock/users'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterTest from './pages/Register/RegisterTest'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'

function App() {
  const users = mockUsers
  return (
    <Router>
      <div className="App">
        {/* <Header  />  Use another header here, since this one is the dashboard header */}
        <Switch>
          <Main>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/emails" component={Emails} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registertest" component={RegisterTest} />
            <Route exact path="/createuser" component={CreateUser} />
            <Route exact path="/edituser/:id" component={EditUser} />
          </Main>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
