import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { MyFriend } from '../../components/MyFriend/MyFriend';
import { MyFriendRequests } from '../../components/MyFriendRequests/MyFriendRequests';
import { AuthContext } from '../../contexts/AuthProvider'
import { useToken } from '../../hooks/useToken';
import './friends.css'

export const Friends = () => {
  const auth = useContext(AuthContext);
  
 

    if (!auth.user) {
        return (
            <Navigate to='/welcome' />
        )
  }
  const requests = auth.user.friendRequests.map(friend => <MyFriendRequests key={friend._id} friend={friend} />)
  const friends = auth.user.friends.map(friend => <MyFriend key={friend._id} friend={friend} />)


  return (
    <div className='friends-page'>
      <div className='friends-page-container'> 
        <div className='friend-requests'>
          <h3> Friend Requests </h3>
          {requests}
        </div>
        <div className='my-friends'>
          <h3> My Friends </h3>
          {friends}
        </div>


      </div>
    </div>
  )
}
