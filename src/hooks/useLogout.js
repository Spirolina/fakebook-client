import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { useToken } from './useToken';

export const useLogout = () => {
  const { makeToken } = useToken();
  const auth = useContext(AuthContext);


  return () => {
      
        localStorage.removeItem('token');
    localStorage.removeItem('user');
    auth.setPPData('');
    auth.setToken('');
        makeToken();
  }
}
