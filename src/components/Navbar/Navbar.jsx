import React from 'react'
import './navbar.css'
import { NavLink, Link } from "react-router-dom";
import { BiWorld } from 'react-icons/bi'
import img from '../../default.jpeg';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useLogout } from '../../hooks/useLogout';
import {FiLogOut} from 'react-icons/fi'
import { useImage } from '../../hooks/useImage';
import ReactLoading from 'react-loading';
import pp from '../../images/pp.jpg'

export const Navbar = () => {
    

    const auth = useContext(AuthContext);
    const logout = useLogout();
    useImage(auth.user ? auth.user.pp : null, auth.user ? true : null);
    if (!auth.user) {
        return (
            <div className='navbar'>
            <div className='navbar-container'>
                <div className='brand center'>
                <Link to='/home' >  <span className='brand-span'> Fakebook </span> </Link>
                  
                </div>
            
            </div>
         
        </div>
        )
    }

    let activeClassName = 'navbar-active';
    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <div className='brand'>
                <Link to='/home' >  <span className='brand-span'> Fakebook </span> </Link>
                  
                </div>
                <div className='navbar-buttons'>
                    <NavLink to='/home'
                    className={({isActive}) => isActive ? activeClassName : undefined}
                    > Home </NavLink>
                    <NavLink to='/friends'
                    className={({isActive}) => isActive ? activeClassName : undefined}
                    > Friends </NavLink>

                </div>

                <div className='notification'>
                   <span className='not-icon'> <BiWorld /></span>
                </div>

                <div className='account'>
                    {auth.ppData ?  <img src={`data:image/${auth.ppData.contentType};base64, ${auth.ppData.data} `} className='navbar-pp' />  : <img src={pp} className='navbar-pp' />  } 
                    <span onClick={logout} className='logout-icon'>  <FiLogOut /> </span>
                </div>
            </div>
         
        </div>
    );
}
