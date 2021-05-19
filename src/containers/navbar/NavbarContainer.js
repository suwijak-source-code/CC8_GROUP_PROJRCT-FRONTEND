import "./NavbarContainer.css";
import ButtonComponent from "../../components/navbarComponent/button/ButtonComponent";
import LinkMenuComponent from "../../components/navbarComponent/linkMenu/LinkMenuComponent";
import LogoComponent from "../../components/navbarComponent/logo/LogoComponent";
import LoginSuccess from "../../components/navbarComponent/loginSuccess/LoginSuccess"
import { useSelector } from "react-redux";




const NavbarContainer = () => {
    const isAuthenticated = useSelector((state) => state.authenticated.isAuthenticated);
    const role = useSelector((state) => state.authenticated.role);

    return (
        <div className="nav-container">
            <div className="nav-container-link-logo">
                <div className="nav-logo">
                    <LogoComponent />
                </div>
                <div className="nav-link">
                    {role === 'admin' && <LinkMenuComponent />}
                    {role !== 'admin' && <></>}
                </div>
            </div>
            <div className="nav-container-button">
                {!isAuthenticated && <ButtonComponent />}
                {isAuthenticated && <LoginSuccess />}
            </div>
        </div>

    )
};

export default NavbarContainer;