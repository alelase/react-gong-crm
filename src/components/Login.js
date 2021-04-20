import './Login.css'
import { useHistory } from "react-router-dom";

const Login = ({isUserAuthenticated, authenticate}) => {

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        // fetch('/api/form-submit-url', {
        //     method: 'POST',
        //     body: data,
        // });
        authenticate();
        history.push("/account");

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
                        <input required v-model="username" type="text" placeholder="enter your email"/>
                    </div>
                    <div className="password-container">
                        <label>Password</label>
                        <input required v-model="password" type="password" placeholder="Password"/>
                    </div>
                    <hr/>
                    <div className="button-container">
                        <div v-show="status==='error'" className="error">login error!</div>
                        <button type="submit">Login</button>
                    </div>

                </div>
            </form>
        </div>
    )
}


export default Login