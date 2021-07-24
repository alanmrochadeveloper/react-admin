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

function App() {
  const users = mockUsers
  return (
    <Router>
      <div className="App">
        {/* <Header  />  Use another header here, since this one is the dashboard header */}
        <Switch>
          <Main>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/users">
              <Users users={users} />
            </Route>
            <Route exact path="/emails">
              <Emails />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/registertest">
              <RegisterTest />
            </Route>
          </Main>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
