import "./ChangePasswordComponent.css";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "../../config/axios";
import localStorageService from '../../services/localStorageService';
import { setIsAuthenticated, setRole } from '../../features/Authenticated/AuthenticatedSlice';
import { Flex, FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";


const ChangePasswordComponent = ({ setChangePassword }) => {
    const [dataPassword, setDataPassword] = useState({
        oldPassword: '', newPassword: '', newConfirmPassword: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataPassword(prev => ({ ...prev, [name]: value }));
    };

    const validateInput = () => {
        const newError = {};
        if (!dataPassword.oldPassword) newError.oldPassword = 'กรุณาระบุรหัสผ่านเก่า';
        if (!dataPassword.newPassword) newError.newPassword = 'กรุณาระบุรหัสผ่านใหม่';
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(dataPassword.newPassword)))
            newError.newPassword = 'รหัสผ่านต้องมี 8-15 ตัวอักษรและต้องมีอักษรตัวใหญ่, ตัวเล็ก, ตัวเลข, อักขระพิเศษ อย่างน้อย 1 ตัว';
        if (!dataPassword.newConfirmPassword) newError.newConfirmPassword = 'กรุณาระบุยืนยันรหัสผ่านใหม่';
        if (dataPassword.newPassword !== dataPassword.newConfirmPassword) newError.newConfirmPassword = 'กรุณาระบุยืนยันรหัสผ่านใหม่ให้ตรงกับรหัสผ่านใหม่';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            await axios.patch(`/users/change-password`, {
                oldPassword: dataPassword.oldPassword, newPassword: dataPassword.newPassword,
                newConfirmPassword: dataPassword.newConfirmPassword
            });
            localStorageService.clearToken();
            localStorageService.clearRole();
            dispatch(setIsAuthenticated(false));
            dispatch(setRole(false));
            history.push('/');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        };
    };

    const handleClose = (e) => {
        e.preventDefault();
        setChangePassword(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setDataPassword({
            oldPassword: '', newPassword: '', newConfirmPassword: ''
        })
    };

    return (
        <Box className="popup-change-password">
            <di className="popup-change-password-from">
                <div>
                    <a className="close-popup-change-password" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1><b>เปลี่ยนรหัสผ่าน</b></h1>
                </div>
                <div><hr /></div>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <FormControl isRequired>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">รหัสผ่านเก่า:</FormLabel>
                                <Input type="password" name="oldPassword" value={dataPassword.oldPassword} placeholder="รหัสผ่านเก่า"
                                    onChange={handleInputChange} />
                                {error.oldPassword && <Box as="span" textAlign="center" color="#E53E3E">{error.oldPassword}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">รหัสผ่านใหม่:</FormLabel>
                                <Input type="password" name="newPassword" value={dataPassword.newPassword} placeholder="รหัสผ่านใหม่"
                                    onChange={handleInputChange} />
                                {error.newPassword && <Box as="span" textAlign="center" color="#E53E3E">{error.newPassword}</Box>}
                            </Flex>
                            <Flex flexFlow="column wrap">
                                <FormLabel my="3">ยืนยันรหัสผ่านใหม่:</FormLabel>
                                <Input type="password" name="newConfirmPassword" value={dataPassword.newConfirmPassword} placeholder="ยืนยันรหัสผ่านใหม่"
                                    onChange={handleInputChange} />
                                {error.newConfirmPassword && <Box as="span" textAlign="center" color="#E53E3E">{error.newConfirmPassword}</Box>}
                            </Flex>
                        </FormControl>
                        <Box my="5">
                            <hr />
                        </Box>
                        <Flex justifyContent="center">
                            <Box mx="3">
                                <Button variant="primary" type="submit" size="sm">ตกลง</Button>
                            </Box>
                            <Box mx="3">
                                <Button variant="primary" size="sm" onClick={handleReset}>ล้าง</Button>
                            </Box>
                        </Flex>
                    </form>
                </div>
            </di>
        </Box>
    )
};

export default ChangePasswordComponent;