import { createContext, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = (props) => {
    const [token, setToken] = useState();

    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
    }

    return (<AuthContext.Provider value={{ token, setToken, logout }}>
        {props.children}
    </AuthContext.Provider>)
}

export default AuthProvider;