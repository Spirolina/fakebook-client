import React from 'react'
import './friend.css'
import pp from '../../images/pp.jpg'
import { useImage } from '../../hooks/useImage';
import { RiHeartAddFill } from 'react-icons/ri'
import {FcCancel} from 'react-icons/fc'
import { useFriend } from '../../hooks/useFriend';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useEffect } from 'react';
import ReactLoading from 'react-loading'

export const Friend = ({ friend }) => {

  const auth = useContext(AuthContext);
    
  const [friendImage, friendLoading, friendError ] = useImage(friend.pp, false);  
  const { sendRec, acceptRec, rejectRec, loadingFriend, error, success } = useFriend();
  const [myFriend, setMyFriend] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {

    if (success) {
      auth.refreshUser();

    }

  },[success])

  const handleClick = (e) => {
    e.preventDefault();
    sendRec(friend._id);
  }

  useEffect(() => {
    
    if (auth.user.friendRequestsSended.length !== 0) {
      let sended = false;

      auth.user.friendRequestsSended.forEach(user => {
        
        if (user._id === friend._id) {
          sended = true;
      }
      })
      if (sended) {
        setRequestSent(true);
      } else {
        setRequestSent(false);
      }

    } else {
      setRequestSent(false);
    }
    

  },[auth.user])




  return (
      <div className='friend-rec'>
          <div className='friend-rec-pp-box'>
          {friendImage ? <img src={`data:image/${friendImage.contentType};base64, ${friendImage.data} `} className='friend-rec-pp' /> : <img src={pp} className='friend-rec-pp' />}

          </div>
          <div className='friend-rec-username'>
              {friend.username}
         </div>

          <div className='friend-rec-button-box'>
        {loadingFriend ? <ReactLoading type='spin'
          height='30px'
          color='blue'
          width='30px' /> : !requestSent ? <button onClick={handleClick} className='friend-rec-button' > <RiHeartAddFill /> </button>
                      :                <button className='friend-rec-button ' onClick={handleClick}> <FcCancel /> </button> }
      </div>
    </div>
  )
}
