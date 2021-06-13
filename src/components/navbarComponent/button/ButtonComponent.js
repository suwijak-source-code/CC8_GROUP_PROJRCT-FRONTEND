import { useState } from "react";
import { Link } from "@chakra-ui/react";
import LoginContainer from "../../../containers/login/LoginContainer"


const ButtonComponent = () => {
    const [popup, setPopup] = useState(false);

    const handleOpen = (e) => {
        e.preventDefault();
        setPopup(true);
    }

    return (
        <>
            <Link color="white" onClick={handleOpen}>เข้าสู่ระบบ</Link>
            {popup && <LoginContainer setPopup={setPopup} />}
        </>
    )
}

export default ButtonComponent;