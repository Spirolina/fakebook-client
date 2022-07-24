import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useTimeline } from '../../hooks/useTimeline'
import { Post } from '../Post/Post';
import './timeline.css'


export const Timeline = () => {
  const auth = useContext(AuthContext);

  const posts = auth.posts.map(post => <Post post={post} key={post._id} />);

  return (
    <div className='timeline'>
      {posts}
    </div>
  )
}
