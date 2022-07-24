import React from 'react'
import './auths.css'
import { motion } from "framer-motion"
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useEffect } from 'react'
import ReactLoading from 'react-loading'

export const Signup = ({ username, password, setUsername, setPassword, setPasswordAgain, setEmail, passwordAgain, email }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordAgainError, setPasswordAgainError] = useState('')
    const [emailError, setEmailError] = useState('');

    const { signup, loading, error } = useSignup();

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
    }

    const imageVariant = {
        visible: { width: 100 },
        hidden: {width: 0}
    }


    useEffect(() => {
        if (error.indexOf('username') !== -1) {
            setUsernameError(error);
            setUsername(error);
        } else {
            setPasswordError(error);
            setPassword(error);
            setPasswordAgain('');
            
        }
    },[error])
    
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

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

        if (!passwordAgain) {
            setPasswordAgainError(true);
            setPasswordAgain('password confirmation must be exist');
        }

        if (!email) {
            setEmailError(true);
            setEmail('email must be exist');
        }

        signup(username, email, password, passwordAgain, selectedFile);
    }
    
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    return (
        <form>

        <motion.div className='signup'
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <h3 className='auths-title'> Sign up</h3>
            <p className='auths-p'> Fill the blanks to sign up !</p>
            <hr className='signup-hr'></hr>
                <div className='username'> <label> Username:  </label> <input
                    required
                    type='text'
                    className={usernameError ? 'error' : null}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    onFocus={() => {
                        if (usernameError) {

                            setUsernameError('');
                        setUsername('')
                        }
                    }}
                /> </div>
                <div className='email'><label> Email: </label> <input
                    required
                    className={emailError ? 'error' : null}
                    type='email'
                    onFocus = {() => {
                        if (emailError) {

                            setEmailError('');
                        setEmail('')
                        }
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />   </div>
                <div className='password'><label> Password: </label> <input
                    required
                    type={passwordError ? 'text' : 'password'}
                    className={passwordError ? 'error' : null}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                        if (passwordError) {

                            setPasswordError('');
                        setPassword('')
                        }
                    }}
                    value={password} /> </div>
                <div className='password-conf'><label> Password again: </label> <input
                    required
                    className={passwordAgainError ? 'error' : null}
                    type={passwordAgainError ? 'text' : 'password'}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    onFocus = {() => {
                        if (passwordAgainError) {

                            setPasswordAgainError('');
                        setPasswordAgain('')
                        }
                    }}
                    value={passwordAgain} /> </div>
            <div className='image'><label>Select an image for profile (optional): </label> <input  onChange={onSelectFile} type='file'  />
                {selectedFile && <motion.img
                    initial="hidden"
                    animate="visible"
                    variants={imageVariant}
                    className='preview-image' src={preview} />}
            </div>
             
           
            <div  className='submit' onClick={handleClick}>  {loading ? <ReactLoading type='spin' color='blue' /> : <button type='submit' className='auths-submit'> Submit </button>}
            </div>
            </motion.div>
            </form>

    );
}
