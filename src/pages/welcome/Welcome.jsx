import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Login } from '../../components/auths/Login';
import { Signup } from '../../components/auths/Signup';
import { AuthContext } from '../../contexts/AuthProvider'
import { motion } from 'framer-motion';
import './welcome.css'


export const Welcome = () => {
    
  const auth = useContext(AuthContext);
  const [signupClass, setSignupClass] = useState('welcome-signup')
  const [loginClass, setLoginClass] = useState('welcome-login')
  const [choice, setChoice] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('')
  const [email, setEmail] = useState('')

  const box = {
    hidden: { opacity: 0, y: -100 },
    visible: (custom) => ({
      opacity: 1, y: 0,
      transition: { delay: custom * 0.2 }
    }),
   
  }

  const buttons = {
    hidden: { opacity: 0, x: -100 },
    visible: (custom) => ({
      opacity: 1, x: 0,
      transition: { delay: custom * 0.2 }
    })
  }
  const handleOver = (item) => {
    if (item === 'login') {
      setLoginClass('welcome-login full')
      setSignupClass('welcome-signup none')
    }

    if (item === 'signup') {
      setLoginClass('welcome-login none')
      setSignupClass('welcome-signup full')
    }
  }

  const handleOut = (item) => {
    if (item === 'login') {
      setSignupClass('welcome-signup')
      setLoginClass('welcome-login')
    }
    if (item === 'signup') {
      setSignupClass('welcome-signup')
      setLoginClass('welcome-login')
    }
  }
  
  if (auth.user) {
    return (
      <Navigate to='/home' />
    )
  }

  return (
    <div className='welcome'>
      <div className='welcome-container'>
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={box}
          className='welcome-box'>
          <div className='welcome-box-title'>
            <h3> Welcome !</h3>
          </div>
          <p>  Hello guest, to be able to socialize join our family!   </p>
        </motion.div>
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={buttons}
          className='welcome-content'>
          <div className='welcome-buttons'>
            <button onClick={() => setChoice('login')} onMouseOver={() => handleOver('login')} onMouseOut={() => handleOut('login')} className={loginClass}>
              Login
            </button>
            <button onClick={() => setChoice('signup')} onMouseOver={() => handleOver('signup')} onMouseOut={() => handleOut('signup')} className={signupClass}>
              Sign up
            </button>
          </div>
        </motion.div>
        <div className='auths'>
          {choice ? choice === 'login' ? <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword} /> : <Signup
            passwordAgain={passwordAgain}
            setPasswordAgain={setPasswordAgain}
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          /> : null}

        </div>

      </div>
    </div>
  );
};
