import React from 'react'
import './auths.css'
import { motion } from "framer-motion"
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import ReactLoading from 'react-loading'
import { useEffect } from 'react'

export const Login = ({username, password, setUsername, setPassword}) => {

    const { login, token, user, loading, error } = useLogin();
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        if (!username) {
            setUsernameError(true);
            setUsername('username must be exist');
        }

        if (!password) {
            setPasswordError(true);
            setPassword('password must be exist');
        }
        login(username, password);

    }

    useEffect(() => {
        if (error === 'user not found') {
            setUsernameError(error);
            setUsername(error);
            setPasswordError('');
        } else {
            setPasswordError(error);
            setPassword(error);
            setUsernameError('');
        }
    },[error])

    return (
        <form>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
    
                className='login'>
                <h3 className='auths-title'> Log in</h3>
                <p className='auths-p'> If you already have an accoutn log in !</p>
                <hr className='auths-hr'></hr>
                <div className='username'> <label> Username:  </label> <input className={usernameError ? 'error' : null} required type='text' onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => {
                        if (usernameError) {
                            setUsernameError('');
                            setUsername('')
                        }

                    }}
                    value={username} /> </div>
                <div className='password'><label> Password: </label> <input className={passwordError ? 'error' : null} required type={passwordError ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} onFocus={() => { setPasswordError('');  setPassword('')}} value={password} /> </div>
                <div className='submit' onClick={handleClick}> {loading ? <ReactLoading type='spin' color='blue'  /> :  <button className='auths-submit'> Submit </button>}  </div>
            </motion.div>
        </form>

    );
}
