import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useToken } from './useToken';
import { MdSettingsInputComponent } from 'react-icons/md';

export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { makeToken} = useToken();

    const reset = () => {
        setUsername('')
        setPassword('')
    }

    useEffect(() => {
        if (username && password) {
            setLoading(true);
            setError('');
            axios
                .post('https://spirolina-fakebook.herokuapp.com/api/login', {
                    username,
                    password
                })
                .then(res => {
                    
                    setToken(res.data.token);
                    setUser(res.data.user);
                    makeToken(res.data.token, res.data.user);
                    setError('');
                    setLoading(false);
                    reset()
                })
                .catch(err => {
                    setError(err.response.data.msg);
                    setLoading(false);
                    reset();
                })
        }
      
    },[username, password])


    return ({
        login: (username, password) => {
            setUsername(username);
            setPassword(password);
        },
        token,
        user,
        loading,
        error
    });
}
