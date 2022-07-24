import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';


export const useFriend = () => {
    const [userId, setUserId] = useState('');
    const [accept, setAccept] = useState(false);
    const [reject, setReject] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const auth = useContext(AuthContext);
    
    useEffect(() => {

        const reset = () => {
            setUserId('');
            setAccept(false);
            setReject(false)
        }

        if (userId) {
            
            if (!accept && !reject) {
                setLoading(true);
                setSuccess(false);
                axios
                    .post(`https://spirolina-fakebook.herokuapp.com/api/users/${userId}`, {}, {
                        headers: {
                            'Authorization': auth.token
                        }
                })
                    .then(res => {
                        setSuccess(true);
                        setLoading(false);
                        
                    })
                    .catch(err => {
                        setError(err.response.data.msg);
                        setLoading(false);
                    })
                reset();
            } 

            if (accept) {
                setLoading(true);
                setSuccess(false);
                axios
                    .post(`https://spirolina-fakebook.herokuapp.com/api/requests/${userId}/yes`, {}, {
                        headers: {
                            'Authorization': auth.token
                        }
                })
                    .then(res => {
                        setSuccess(true);
                        setLoading(false);
                        

                    })
                    .catch(err => {
                        setError(err.response.data.msg);
                        setLoading(false);
                    })
                reset();
            }

            if (reject) {
                setLoading(true);
                setSuccess(false);
                axios
                    .post(`https://spirolina-fakebook.herokuapp.com/api/requests/${userId}/no`, {}, {
                        headers: {
                            'Authorization': auth.token
                        }
                })
                    .then(res => {
                        setSuccess(true);
                        setLoading(false);
                        

                    })
                    .catch(err => {
                        setError(err.response.data.msg);
                        setLoading(false);
                    })
                reset();
            }


            
        }

    },[userId, accept])


  return (
      {
          sendRec: (userId) => {
              setUserId(userId);
          },
          acceptRec: (userId) => {
              setUserId(userId);
              setAccept(true);
          },
          rejectRec: (userId) => {
              setUserId(userId);
              setReject(true);
              
          },
          loadingFriend: loading,
          error,
          success
      }
  )
}
