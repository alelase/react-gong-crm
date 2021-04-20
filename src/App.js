import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import Account from './components/Account'
import Footer from './components/Footer'
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

function App() {

    const [employees, setEmployees] = useState([])
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

    const authenticate = () => setIsUserAuthenticated(true);
    const deauthenticate = () => setIsUserAuthenticated(false);

  return (
    <div className="App">
      <Header title='GONG CRM' isUserAuthenticated={isUserAuthenticated} deauthenticate={deauthenticate} />
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" >
                    <Login isUserAuthenticated={isUserAuthenticated} authenticate={authenticate} />
                </Route>
                <Route exact path="/account">
                    {!isUserAuthenticated?<Redirect to="/login" /> :
                    <Account  employees={employees} isUserAuthenticated={isUserAuthenticated} authenticate={authenticate} />}
                </Route>
                {isUserAuthenticated?<Redirect to="/account" /> :
                    <Redirect to="/login" />}
            </Switch>
        </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
