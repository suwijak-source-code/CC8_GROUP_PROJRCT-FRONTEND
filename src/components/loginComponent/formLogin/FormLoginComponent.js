import "./FormLoginComponent.css";
import axios from '../../../config/axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import localStorageService from '../../../services/localStorageService';
import { setIsAuthenticated, setRole } from '../../../features/Authenticated/AuthenticatedSlice';
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";



const FormLoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const validateInput = () => {
        const newError = {};
        if (!username) newError.username = 'username is required';
        if (!password) newError.password = 'password is required';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            const res = await axios.post('/users/login', { username, password });
            localStorageService.setToken(res.data.token);
            localStorageService.setRole(res.data.role);
            dispatch(setIsAuthenticated(true));
            if (res.data.role === "admin") {
                dispatch(setRole("admin"));
                history.push('/work-plan-management');
            } else if (res.data.role === "gardener") {
                dispatch(setRole("gardener"));
                history.push('/gardener-job');
            } else if (res.data.role === "sales") {
                dispatch(setRole("sales"));
            }
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    }

    return (
        <>
            <form action="" onSubmit={handlerSubmit}>
                {error.server && <span className="login-error" style={{ color: "red" }}>{error.server}</span>}
                <div className="login-input-container">
                    <input className="login-input-box" name="username" type="text" placeholder="Username" value={username}
                        onChange={e => setUsername(e.target.value)} />
                    {error.username && (
                        <span className="login-error" style={{ color: 'red' }}>
                            {error.username}
                        </span>
                    )}
                </div>
                <div className="login-input-container">
                    <input className="login-input-box" name="password" type="password" placeholder="Password" value={password}
                        onChange={e => setPassword(e.target.value)} />
                    {error.password && (
                        <span className="login-error" style={{ color: 'red' }}>
                            {error.password}
                        </span>
                    )}
                </div>

                <div className="login-button-container">
                    <Button variant="primary" type="submit">เข้าสู่ระบบ</Button>
                </div>
            </form>
            <div><hr /></div>
        </>
    )
}

export default FormLoginComponent;