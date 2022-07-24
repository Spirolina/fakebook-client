import React from 'react'
import './myfriendrequests.css'
import { useImage } from '../../hooks/useImage';
import { TiTick } from 'react-icons/ti'
import {ImCross} from 'react-icons/im'
import pp from '../../images/pp.jpg'
import { useFriend } from '../../hooks/useFriend';
import ReactLoading from 'react-loading'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

export const MyFriendRequests = ({ friend }) => {
    const [image, loading, error ] = useImage(friend.pp, false);  
    const {acceptRec, rejectRec, loadingFriend, errorFriend, success} = useFriend()
    const auth = useContext(AuthContext)

    const handleAccept = (e) => {
        
        e.preventDefault()
        acceptRec(friend._id);
    }

    const handleReject = (e) => {
        e.preventDefault()
        rejectRec(friend._id);
    }
    
    useEffect(() => {
        auth.refreshUser();
    },[success])
  
  
    return (
      <div className='my-friend-req'>
          <div className='my-friend-req-pp'>
          {image ? <img src={`data:image/${image.contentType};base64, ${image.data} `} className='navbar-pp' /> : <img src={pp} className='navbar-pp' />}
          </div>
          <div className='my-friend-req-username'>
              {friend.username}
          </div>

          {loadingFriend ? <ReactLoading className='loading' type='spin' color='blue' width={40} height={40} /> : <div className='my-friend-req-buttons'>
              <button onClick={handleAccept} className='my-friend-req-yes'>
                <TiTick />
              </button>

              <button onClick={handleReject} className='my-friend-req-no'>
              <ImCross />
              </button>
          </div>}
    </div>
  )
}
