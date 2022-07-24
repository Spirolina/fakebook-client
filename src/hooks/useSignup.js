import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useToken } from './useToken';
import { useImage } from './useImage';
import { AuthContext } from '../contexts/AuthProvider';

export const useSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState('');

    const auth = useContext(AuthContext);

    const { makeToken } = useToken();
    // const { uploadImage, imageId, tokenImage } = useImage();
    const reset = () => {
        setUsername('');
        setPassword('');
        setPasswordAgain('');
        setEmail('');
        setImage('');

    }


    useEffect(() =>   {
        if (username && password && email && passwordAgain) {
            setError('');
            setLoading(true);
            if (password !== passwordAgain) {
                setError('Passwords must be matched !');
                setLoading(false);
                reset();
            } else {
                
                axios
                    .post('https://spirolina-fakebook.herokuapp.com/api/register', {
                        username,
                        password,
                    },)
                    .then(resUser => {
                        if (image) {
                            axios
                            .post('https://spirolina-fakebook.herokuapp.com/api/images',
                                { image: image }, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        'Authorization': resUser.data.token
                                      }
                                })
                                .then(res => {
                                
                                    axios
                                        .post(`https://spirolina-fakebook.herokuapp.com/api/users/${resUser.data.user._id}/edit`, { update: { pp: res.data.img._id } }, {
                                            headers: {
                                                'Authorization': resUser.data.token,
                                            }
                                        })
                                        .then(newRes => {
                                            if (res.status === 200) {
                                                
                                                makeToken(resUser.data.token, newRes.data.user);
                                                setError('');
                                                setLoading(false);
                                                reset();
                                            }
                                        })
                                     


                                })
                        } else {
                            makeToken(resUser.data.token, resUser.data.user);
                            setError('');
                            setLoading(false);
                            reset();
                        }
             
                    })
                    .catch(err => {
                        setError(err.response.data.msg);
                        setLoading(false);
                        reset();
                    })
                 
            }
   
        }
      
    }, [username, password, email, passwordAgain, image])



    


    return ({
        signup: (username, email, password, passwordAgain, image) => {
            setUsername(username);
            setPassword(password);
            setEmail(email);
            setPasswordAgain(passwordAgain);
            setImage(image);
        },
        loading,
        error
    });
}
