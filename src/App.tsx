import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Main from './components/Main'
import Emails from './pages/Emails'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterTest from './pages/Register/RegisterTest'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'
import Roles from './pages/Roles'
import CreateRole from './pages/CreateRole'
import EditRole from './pages/EditRole'
import Products from './pages/Products'
import CreateProduct from './pages/CreateProduct'

function App() {
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
            <Route exact path="/users/create" component={CreateUser} />
            <Route exact path="/users/:id/edit" component={EditUser} />
            <Route exact path="/roles" component={Roles} />
            <Route exact path="/roles/create" component={CreateRole} />
            <Route exact path="/roles/:id/edit" component={EditRole} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/create" component={CreateProduct} />
            <Route exact path="/products/:id/edit" component={Products} />
          </Main>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
