import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';

export const useCreatePost = () => {
    const [image, setImage] = useState('');
    const [postContent, setPostContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [created, setCreated] = useState(false);
    const auth = useContext(AuthContext);

    const resetStates = () => {
        setImage('');
        setPostContent('');
        
    }
    useEffect(() => {

        if (image) {
            setLoading(true);
            setError(false);
            setCreated(false);
            axios
            .post('https://spirolina-fakebook.herokuapp.com/api/images',
                { image: image }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': auth.token
                      }
            })
                .then(res => {
                    
                    axios
                        .post('https://spirolina-fakebook.herokuapp.com/api/posts', {
                            photo: res.data.img._id,
                            content: postContent
                        }, {
                            headers: {
                            'Authorization': auth.token
                            }
                        })
                        .then(postRes => {
                            
                            setLoading(false);
                            setCreated(true);
                            auth.refreshTimeline()
                            resetStates();
                        })
                        .catch(err => {
                            if (err) {
                                
                                setError(err.response.data.msg);
                                setLoading(false);
                                resetStates()
                            }
                        })
            })

        } else if(postContent) {
            setLoading(true);
            setCreated(false);

            axios
            .post('https://spirolina-fakebook.herokuapp.com/api/posts', {
                content: postContent
            }, {
                headers: {
                'Authorization': auth.token
                }
            })
                .then(res => {
                    
                    setLoading(false);
                    auth.refreshTimeline()
                    resetStates();
                    setCreated(true);


                })
                .catch(err => {
                if (err) {
                    setError(err.response);
                    setLoading(false);
                    resetStates()

                }
            })
        }
 
    },[image, postContent])
 


  return (
      {
          makeCreatePost : (Aimage, ApostContent ) => {
              setImage(Aimage);
              setPostContent(ApostContent)
          },
          loading,
          error,
          created
      }
  )
}
