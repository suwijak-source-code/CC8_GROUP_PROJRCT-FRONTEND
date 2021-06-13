const tokenName = 'token';
const setToken = token => localStorage.setItem(tokenName, token);
const getToken = () => localStorage.getItem(tokenName);
const clearToken = () => localStorage.removeItem(tokenName);

const roleName = 'role'
const setRole = role => localStorage.setItem(roleName, role);
const getRole = () => localStorage.getItem(roleName);
const clearRole = () => localStorage.removeItem(roleName);

const service = { setToken, getToken, clearToken, setRole, getRole, clearRole };


export default service;
