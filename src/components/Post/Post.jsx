import React, { useContext } from 'react'
import { useImage } from '../../hooks/useImage'
import pp from '../../images/pp.jpg';
import { BiLike } from 'react-icons/bi'
import { FaCommentAlt } from 'react-icons/fa'
import { FcExpand } from 'react-icons/fc'
import { FcCollapse } from 'react-icons/fc';
import { Comment } from '../Comment/Comment';
import './post.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { MakeComment } from '../MakeComment/MakeComment';
import { usePostLike } from '../../hooks/usePostLike';
import { AuthContext } from '../../contexts/AuthProvider';
import {motion} from 'framer-motion'
import { MdHeight } from 'react-icons/md';

export const Post = ({ post }) => {
    const [authorImage, authorLoading, authorError] = useImage(post.author.pp, false);
    const [postImage, postLoading, postError] = useImage(post.photo, false);
    const [showingComments, setShowingComments] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const comments = post.comments.map(comment => <Comment comment={comment} postId={post._id} key={comment._id} />)
    const { makeLike, loading, error, success } = usePostLike();

    const [liked, setLiked] = useState('notliked');
    const [likedNumber, setLikedNumber] = useState(0);
    const auth = useContext(AuthContext);

    const postVariant = {
        visible: {
            marginTop: 0,
            visibility: 'visible'
        },
        hidden: {
           
            marginTop: -40,
            visibility: 'hidden'
        }
      }

    const checkLiked = () => {
        let liked = false;
        post.likes.forEach(like => {
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
    
    const handleLike = () => {
        if (!loading) {
            if (liked === 'liked') {
                setLiked('notliked')
                setLikedNumber(likedNumber - 1)
                makeLike(post._id);
    
            } else {
                setLiked('liked')
                setLikedNumber(likedNumber + 1)
                makeLike(post._id);
            }
        }
      
           
        

    }
    

    useEffect(() => {
        checkLiked();
        setLikedNumber(post.likes.length)
        if (expanded) {
            setShowingComments(comments)
        } else {
            setShowingComments(comments.slice(0, 1));

        }
        
    }, [post])
    

    useEffect(() => {
        setShowingComments(comments.slice(0, 1));

    }, [])

    const expandComments = () => {
        if (!expanded) {
            setShowingComments(comments);
            setExpanded(true);
        }
        else {
            setShowingComments(comments.slice(0, 1));
            setExpanded(false);

        }
       
    }


    return (
        <motion.div
            className='post'
            initial="hidden"
            animate="visible"
            variants={postVariant}
        >
            <div className='upper-panel'>
                <div className='post-pp'>
                    {authorImage ? <img src={`data:image/${authorImage.contentType};base64, ${authorImage.data} `} className='navbar-pp' /> : <img src={pp} className='navbar-pp' />}
                    <div className='post-info'>
                        <div className='post-username'> {post.author.username} </div>
                    
                        <div className='post-date'> {post.date} </div>
                    </div>
                </div>
                {post.content ? <div className='content'> {post.content} </div> : null}
            </div>
            {postImage ? <img src={`data:image/${postImage.contentType};base64, ${postImage.data} `} className='post-photo' /> : null}
            <div className='bottom-panel'>
                <div className={'like'}>
                    <button disabled={loading ? true : false} className={liked} onClick={handleLike}> <span className={'like-icon'}> <BiLike /> </span>  <span> Like </span> <span className='post-like-number'> {likedNumber} </span>  </button>
                </div>

                <div className='comment'>
                    <button> <span className='comment-icon'> <FaCommentAlt /> </span>  <span> Comment</span> <span className='comment-number'> {post.comments.length} </span> </button>
                </div>
            </div>
            <MakeComment post={post} />

            <div className='comments'>
                {showingComments}
            </div>
            {post.comments.length > 1 ? <><hr className='make-comment-divider'></hr>
            <button className='expand-button' onClick={expandComments}> {expanded ? <FcCollapse /> : <FcExpand />} </button>
</>  : null
            }    </motion.div>
    )
};
