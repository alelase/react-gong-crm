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
    const [status, setStatus] = useState("")

    const [user, setUser] = useState({
        username: "jamie.denburg@denbamie.com",
        password: "OP5!K?)@"
    })

    const authenticate = () => {setStatus("success"); setIsUserAuthenticated(true);}
    const deauthenticate = () => {setIsUserAuthenticated(false)};

    // const updateUser = (newVal) => setUsername(newVal => ({
    //     ...newVal
    // }))

    const updateUser = ({...newVal}) => setUser({...user, ...newVal})

    // const updateUser = (updatedUser) => {
    //     //this.setState({username: event.target.value});
    //     console.log("updating user to", event.target.value);
    //     updateUser({username: event.target.value});
    // }

    const onError = () => setStatus("error");

  return (
    <div className="App">
      <Header title='GONG CRM' isUserAuthenticated={isUserAuthenticated} deauthenticate={deauthenticate} user={user} />
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" >
                    <Login isUserAuthenticated={isUserAuthenticated} authenticate={authenticate} user={user} updateUser={updateUser} status={status} onError={onError} />
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
