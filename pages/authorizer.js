import { AuthContext } from '../context/auth-context';
import { useContext, useEffect } from 'react';

const Authorizer = (props) => {
    const { token, setToken } = useContext(AuthContext);

    useEffect(() => {
        if (!token) {
            const existingToken = window.localStorage.getItem("token")

            if (existingToken) {
                setToken(existingToken);
            }
        }
    }, []);

    return props.children
}

export default Authorizer