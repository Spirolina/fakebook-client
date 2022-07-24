import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';

export const useToken = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (token && user) {
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));
            
            auth.setToken(token);
            auth.setUser(user);
        } else {
            setToken(JSON.parse(localStorage.getItem('token')));
            setUser(JSON.parse(localStorage.getItem('user')))
            auth.setToken(token);
            auth.setUser(user);
        }
    
    }, [token, user])

    return {
        makeToken: (argToken, argUser) => {
            setToken(argToken);
            setUser(argUser);
        }
    }
}
