import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { MyFriend } from '../MyFriend/MyFriend'
import './friendscomp.css'

export const FriendsComp = () => {
  const auth = useContext(AuthContext);
  const myFriends = auth.user.friends.map(friend => <MyFriend key={friend._id} friend={friend} />)
  return (
      <div className='friendscomp'>
          {myFriends}     
      </div>
  )
}
