import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';

export const useComment = () => {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [post, setPost] = useState('');
    const [success, setSuccess] = useState(false)

    const auth = useContext(AuthContext);

    useEffect(() => {
        if (post && comment) {
            
            setLoading(true);
            setError(false);
            setSuccess(false);
            axios
                .post(`https://spirolina-fakebook.herokuapp.com/api/posts/${post}/comments`,
                    { content: comment}, {
                        headers: {
                        'Authorization': auth.token
                    }
                })
                .then(res => {
                    
                    setLoading(false);
                    setSuccess(true);
                    auth.refreshTimeline()
                })
                .catch(err => {
                    
                    
                    setError(true);
                    setLoading(false);
                })
        }

    },[comment, post])

    return {
        makeComment: (postId, comment) => {
            
            setPost(postId);
            setComment(comment)
        },
        loading,
        success,
        error
  }
}
