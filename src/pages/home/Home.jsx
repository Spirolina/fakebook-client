import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { Navigate } from 'react-router-dom'
import { FriendRec } from '../../components/FriendRec/FriendRec'
import './home.css'
import { CreatePost } from '../../components/CreatePost/CreatePost'
import { FriendsComp } from '../../components/FriendsComp/FriendsComp'
import { Timeline } from '../../components/Timeline/Timeline'

export const Home = () => {
    const auth = useContext(AuthContext);
    
    if (!auth.user) {
        return (
            <Navigate to='/welcome' replace={true} />
            )
    }

    return (
        <div className='home-container'>
            <FriendRec />
            <div className='timeline-container'>
                <CreatePost />
                <Timeline />

            </div>
            <FriendsComp />
        </div>
    )



}
