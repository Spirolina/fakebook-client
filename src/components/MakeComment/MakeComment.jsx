import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import {IoSend} from 'react-icons/io5'
import pp from '../../images/pp.jpg'
import './makecomment.css'
import { useState } from 'react'
import { useComment } from '../../hooks/useComment'
import ReactLoading from 'react-loading'
import {MdOutlineError} from 'react-icons/md'
import {TiTick} from 'react-icons/ti'
import { useEffect } from 'react'

export const MakeComment = ({ post }) => {
  const [commentContent, setCommentContent] = useState('')
  const [commentContentError, setCommentContentError] = useState('');
  const { makeComment, loading, success, error } = useComment();
  


  useEffect(() => {
    setCommentContent('');
  },[success])

  const handleClick = (e) => {
    e.preventDefault();
    
    if (!commentContent) {
      setCommentContentError(true);
      setCommentContent('comment must be exist');
    }
    
    makeComment(post._id, commentContent);
  }

    const auth = useContext(AuthContext);
  return (
      <div className='make-comment'>
          <div className='make-comment-pp'>
          {auth.ppData ?  <img src={`data:image/${auth.ppData.contentType};base64, ${auth.ppData.data} `} className='navbar-pp' />  : <img src={pp} className='navbar-pp' />  } 
          </div>
          <div className='make-comment-input-box'>
        <input
          className={commentContentError ? 'make-comment-input error' : 'make-comment-input'}
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent} type='text'
          placeholder='Leave a comment...'
          onFocus = {() => {
            if (commentContentError) {

            setCommentContentError(false);
            setCommentContent('')
            }
        }}
        />
        
        {loading ? <ReactLoading type='spin'
          color='blue'
          height='30px'
          width='30px'
 className='make-comment-button' /> : <button onClick={handleClick} className='make-comment-button'> <IoSend /></button> }       {error ? <MdOutlineError className='result-icon danger' /> : success ? <TiTick className='result-icon success' /> : null}
 </div>
    </div>
  )
}
