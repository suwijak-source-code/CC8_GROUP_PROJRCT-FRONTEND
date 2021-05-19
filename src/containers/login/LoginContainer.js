import "./LoginContainer.css";
import FormLoginComponent from "../../components/loginComponent/formLogin/FormLoginComponent"


const LoginContainer = (props) => {
    const handleClose = (e) => {
        e.preventDefault();
        props.setPopup(false);
    }

    return (
        <div className="popup-login">
            <div className="popup-login-from">
                <div>
                    <a className="close-popup-login" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>เข้าสู่ระบบ</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <FormLoginComponent />
                </div>
            </div>
        </div>
    )
}

export default LoginContainer;