import axios from 'axios';
import localStorageService from '../services/localStorageService'

axios.defaults.baseURL = 'http://localhost:8000';

//interceptors ดักจับส่ง token ทุกหน้าที่ส่งไป backend
axios.interceptors.request.use(config => {
    //เป็นการแนบ token แบบ Interceptors
    config.headers.Authorization = `Bearer ${localStorageService.getToken()}`;
    return config;
}, err => Promise.reject(err));

axios.interceptors.response.use(response => response, err => {
    if (err.response.status === 401) {
        localStorageService.clearToken();
        window.location.assign('/');
        return;
    }
    return Promise.reject(err);
})

export default axios;
