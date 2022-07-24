import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';

export const useCommentLike = () => {
    const [postId, setPostId] = useState('');
    const [commentId, setCommentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const auth = useContext(AuthContext)

    const reset = () => {
        setPostId('');
        setCommentId('');
    };

    useEffect(() => {

        if (commentId && postId) {
            setLoading(true);
            axios
                .post(`https://spirolina-fakebook.herokuapp.com/api/posts/${postId}/comments/${commentId}/like`,
                    {}, {
                        headers: {
                        'Authorization': auth.token
                    }}
            )
                .then(res => {
                    
                    setLoading(false);
                    setSuccess(true);
                    reset();
                })
                .catch(err => {
                    setLoading(false);
                    setError(err.response.data.msg);
                    setSuccess(false);
                    reset();
                })
        }


    },[postId, commentId])

    return {
        makeCommentLike: (postId, commentId) => {
            setPostId(postId);
            setCommentId(commentId);
        },
        loading,
        error,
        success
  }
}
