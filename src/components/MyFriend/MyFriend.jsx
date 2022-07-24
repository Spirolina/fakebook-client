import React from 'react'
import './myfriend.css'
import { useImage } from '../../hooks/useImage';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import pp from '../../images/pp.jpg'

export const MyFriend = ({ friend }) => {
    const [image, loading, error ] = useImage(friend.pp, false);  
    const auth = useContext(AuthContext)
    
  return (
      <div className='my-friend'>
          <div className='my-friend-pp'>
          {image ? <img src={`data:image/${image.contentType};base64, ${image.data} `} className='navbar-pp' /> : <img src={pp} className='navbar-pp' />}
          </div>   
          
          <div className='my-friend-username'>
              {friend.username}
          </div>

    </div>
  )
}
