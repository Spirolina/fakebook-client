import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

export const usePostLike = () => {
    const [postId, setPostId] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)
    const auth = useContext(AuthContext);

    const reset = () => {
        setPostId('');
    }

    useEffect(() => {
        if (postId) {
            setLoading(true);
            setSuccess(false);
            axios
            .post(`https://spirolina-fakebook.herokuapp.com/api/posts/${postId}/like`, {}, {
                headers: {
                'Authorization': auth.token
                }
            })
                .then(res => {
                    setSuccess(true);
                    
                    setLoading(false);
                    auth.refreshTimeline();
                    reset()
            })
                .catch(res => {
                    setLoading(false);
                    setError(true);
                    reset();
            })
        }
    },[postId])



    return {
        makeLike: (postId) => {
            setPostId(postId);
        },
        loading,
        error,
        success
    }
}
