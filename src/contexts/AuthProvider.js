import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useTimeline } from '../hooks/useTimeline';
import { useToken } from '../hooks/useToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  const [ppData, setPPData] = useState();
  const { makeTimeline, posts } = useTimeline();

  const refreshTimeline = () => {
    makeTimeline(token);
  }

  const refreshUser = () => {
    
    axios
      .get(`https://spirolina-fakebook.herokuapp.com/api/users/${user._id}`, {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        
      })
  }

  useEffect(() => {
    if (token) {
      makeTimeline(token);
    }
  },[token])

const value = {user, token, setToken, setUser, ppData, setPPData, posts, refreshTimeline, refreshUser}
  return (
    <AuthContext.Provider value={value} >
      {children}
   </AuthContext.Provider>
  )
}
