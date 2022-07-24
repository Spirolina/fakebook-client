import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useFriendRec } from '../../hooks/useFriendRec'
import { useState } from 'react';
import './friendrec.css'
import { Friend } from '../Friend/Friend';

export const FriendRec = () => {

  const [friendRecs, loading] = useFriendRec();
  const [myRecs, setMyRecs] = useState([])
  const auth = useContext(AuthContext);


  
  let friends = friendRecs.map(friend => <Friend key={friend._id}  friend={friend}/>)

  return (
      <div className='friend-rec-box'>
          {friends}

      </div>
  )
}
