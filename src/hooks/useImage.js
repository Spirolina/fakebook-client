import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';

export const useImage = (imageId, user) => {
    const [imageData, setImageData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);

    useEffect(() => {
        
        if (imageId) {
            setLoading(true);
            axios
                .get(`https://spirolina-fakebook.herokuapp.com/api/images/${imageId}`)
                .then(res => {
                    setImageData(res.data);
                    if (user) {
                        auth.setPPData(res.data) 
                    }  
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.response.data.msg);
                    setLoading(false)
                })
        }

        
    },[imageId])



    return [imageData, loading, error]
}
