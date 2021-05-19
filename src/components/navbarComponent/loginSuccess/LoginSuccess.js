import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../config/axios';
import localStorageService from '../../../services/localStorageService';
import { setIsAuthenticated, setRole } from '../../../features/Authenticated/AuthenticatedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../../features/Profile/ProfileSlice';
import { Link, Box } from "@chakra-ui/react";
import ChangePasswordComponent from '../../changePasswordComponent/ChangePasswordComponent';


const LoginSuccess = () => {
    const [changePassword, setChangePassword] = useState(false)

    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile.userProfile);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/users/by-user');
                dispatch(setUserProfile(res.data.profile));
            } catch (err) { }
        }
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setChangePassword(true);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorageService.clearToken();
        localStorageService.clearRole();
        dispatch(setIsAuthenticated(false));
        dispatch(setRole(false));
        history.push('/');
    }

    return (
        <>
            <Box mx="10px">
                <Box as="span" color="white">สวัสดี {userProfile.firstName} {userProfile.lastName}</Box>
            </Box>

            <Box mx="10px">
                <Link color="white" onClick={handleChange}>เปลี่ยนรหัสผ่าน</Link>
            </Box>

            <Box mx="10px">
                <Link color="white" onClick={handleLogout}>Logout</Link>
            </Box>
            {changePassword && <ChangePasswordComponent setChangePassword={setChangePassword} />}
        </>
    )
}

export default LoginSuccess;