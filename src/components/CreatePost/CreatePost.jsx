import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import {MdSend} from 'react-icons/md'
import { useImage } from '../../hooks/useImage'
import ReactLoading from 'react-loading';
import pp from '../../images/pp.jpg'
import './createpost.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { motion } from "framer-motion"
import { useCreatePost } from '../../hooks/useCreatePost'


const imageVariant = {
  visible: { width: "100%" },
  hidden: {width: 0}
}
export const CreatePost = () => {
  const { makeCreatePost, loading, error, created } = useCreatePost();

  const auth = useContext(AuthContext);
  const [selectPhoto, setSelectPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState()
  const [postContent, setPostContent] = useState('')
  const [postContentError, setPostContentError] = useState('');
  const [preview, setPreview] = useState()

  useEffect(() => {
    setPostContent('');
    setSelectedFile(null)
    setSelectPhoto(false);
    setPreview(undefined);
    
  },[created])

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }
  
  const handleClick = (e) => {
    e.preventDefault();

    if (!postContent && !selectedFile) {
      setPostContentError(true);
      setPostContent('post content must be exist');
    }

    makeCreatePost(selectedFile, postContent)
  }

  return (
    <div className='create-post'>
      <div className='input-box'>
      {auth.ppData ? <img src={`data:image/${auth.ppData.contentType};base64, ${auth.ppData.data} `} className='navbar-pp' /> : <img src={pp} className='navbar-pp' /> } 
        <input type='text'
          className={postContentError ? 'error' : null}
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
          placeholder='What do you think about...?'
          onFocus = {() => {
            if (postContentError) {

                setPostContentError('');
            setPostContent('')
            }
        }}
        />

        
      </div>
      <hr className='create-post-divider'></hr>
      <div className='create-post-buttons'> 
        <button onClick={() => setSelectPhoto(true)} className='add-photo'>
          <div className='button-content'><span className='add-photo-icon'>
          <MdOutlineAddAPhoto />
          </span> Add Photo</div>
        {selectPhoto ? <input onChange={onSelectFile} type='file' /> : null }
        </button>
        {loading ?  <ReactLoading className='post-loading-icon'   type='spin' width='40px' height='40px' color='blue' /> : <button onClick={handleClick} className='send-post'>
        <span className='send-post-icon'>
          <MdSend />
          </span>
          Send   </button>}

      </div>

      <div className='preview-post-photo'> 
      {selectedFile && <motion.img
                    initial="hidden"
                    animate="visible"
                    variants={imageVariant}
                     src={preview} />}

      </div>
      
      </div>
  )
}
