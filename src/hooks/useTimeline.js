import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

export const useTimeline = () => {
    const [token, setToken] = useState('');
    const [posts, setPosts] = useState([]);

    const reset = () => {
        setToken('');
    };

    useEffect(() => {
        if (token ) {
                  axios
            .get('https://spirolina-fakebook.herokuapp.com/api/feed', {
                headers: {
                    'Authorization': token,
                }
            })
            .then(res => {
                setPosts(res.data.timeline)
                reset()
            })
        }
  
    },[token])

    return {
        makeTimeline: (token) => {
            setToken(token);
        },
        posts
  }
}
