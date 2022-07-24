import React from 'react'
import './comment.css'
import pp from '../../images/pp.jpg';
import { useImage } from '../../hooks/useImage';
import { BiLike } from 'react-icons/bi'
import { useCommentLike } from '../../hooks/useCommentLike';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useEffect } from 'react';

export const Comment = ({ comment, postId }) => {
  const [authorImage, authorLoading, authorError ] = useImage(comment.author.pp, false);  
  const [liked, setLiked] = useState('notliked');
  const [likedNumber, setLikedNumber] = useState(0);
  const { makeCommentLike, loading, error, success } = useCommentLike();
  
  const auth = useContext(AuthContext);
  
      
  const handleLike = () => {
    if (!loading) {
      if (liked === 'liked') {
        setLiked('notliked')
        setLikedNumber(likedNumber - 1)
        makeCommentLike(postId, comment._id);

      } else {
        setLiked('liked')
        setLikedNumber(likedNumber + 1)
        makeCommentLike(postId, comment._id);
      }
    }
  }
    const checkLiked = () => {
      let liked = false;
      comment.likes.forEach(like => {
        if (like.owner === auth.user._id) {
          liked = true;
        }
      })
      if (liked) {
        setLiked('liked');
      } else {
        setLiked('notliked');
      }
  }

  useEffect(() => {
    setLikedNumber(comment.likes.length);
  },[comment])
  
  useEffect(() => {
    checkLiked();
  },[])
       
    

    return (
      <div className='comment-container'>
        <div className='comment-pp'>
          {authorImage ? <img src={`data:image/${authorImage.contentType};base64, ${authorImage.data} `} className='navbar-pp' /> : <img src={pp} className='navbar-pp' />}
        </div>
          
        <div className='comment-content'>
          <div className='comment-author'> {comment.author.username} </div>
          <div className='comment-text'>
            {comment.content}
            <div className='comment-like'>
              <button disabled={loading ? true : false} className={'comment-like-button ' +liked} onClick={handleLike} > <BiLike /> <span className='comment-like-number'> {likedNumber} </span>  </button>
            </div>
          </div>
        
        </div>
         
      </div>
    )
  }
