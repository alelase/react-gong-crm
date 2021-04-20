import './Login.css'
import { useHistory } from "react-router-dom";
import Data from "../data.js";

const Login = ({isUserAuthenticated, authenticate, user, updateUser, status, onError}) => {

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.target);
        console.log("dataForm", dataForm);

        const data = new Data();
        data.getSecrets().then(response=> {
            console.log("response", response);
            const userId = data.checkLoginData(response, user);
            if (userId) {
                console.log("Si!");
                authenticate();
                history.push("/account");
            } else {
                console.log("error login!");
                onError();
            }
        });




    }

    const usernameHandler = (event) => {
        //this.setState({username: event.target.value});
        console.log("updating user to", event.target.value);
        updateUser({username: event.target.value});
    }

    const passwordHandler = (event) => {
        //this.setState({username: event.target.value});
        updateUser(event.target.value);
    }

    return (

        <div className="super-login-container">
            <form className="login" onSubmit={handleSubmit}>

                <div className="login-container">
                    <div className="title-login">
                        <h2>Please login</h2>
                    </div>
                    <div className="user-container">
                        <label>User name</label>
                        <input required value={user.username} type="text" onChange={usernameHandler} placeholder="enter your email"/>
                    </div>
                    <div className="password-container">
                        <label>Password</label>
                        <input required value={user.password} type="password" onChange={passwordHandler} placeholder="Password"/>
                    </div>
                    <hr/>
                    <div className="button-container">
                        {status === "error"?<div className="error">login error!</div>:<></>}

                        <button type="submit">Login</button>
                    </div>

                </div>
            </form>
        </div>
    )
}


export default Login