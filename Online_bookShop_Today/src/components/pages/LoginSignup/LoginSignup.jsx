import SignUpForm from "../../form/LoginSignUpForm/SignUpForm";
import LoginForm from "../../form/LoginSignUpForm/LoginForm";
//import './LoginSignup.scss'
const LoginSignUp=()=>{
    return(<>
    <div className="login-signup-wrapper">
    <div className="main">
        <input type="checkbox" id="chk" aria-hidden='true' />
        <div className="sign-up">
            <SignUpForm/>
        </div>
        <div className="login">
            <LoginForm/>
        </div>
    </div>
    </div>
    </>)
}
export default LoginSignUp;