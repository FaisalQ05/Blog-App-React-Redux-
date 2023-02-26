import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNewPost } from './postsSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [post, setPost] = useState({
        title: '',
        content: '',
        userId: ''
    })
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit called")
        if (canSave) {
            const { title, content, userId } = post
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()
                setPost({
                    title: '',
                    content: '',
                    userId: ''
                })
                navigate('/')
            }
            catch (e) {
                console.log("Failed to dave post ", e)
            }
            finally {
                setAddRequestStatus('idle')
            }
        }
    }
    const inputEvent = (e) => {
        setPost(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    const users = useSelector(x => x.users)
    const canSave = [post.title, post.content, post.userId].every(Boolean) && addRequestStatus === 'idle';

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    // console.log(users)
    console.log(post)
    return (
        <section className='addPostSection'>
            <h1>Add post</h1>
            <form onSubmit={handleSubmit}>
                <input name='title' value={post.title} placeholder='Post Title' type="text" id='postTitle' onChange={inputEvent} />
                <textarea name='content' value={post.content} placeholder='Post Content' type="text" id='postContent' onChange={inputEvent} />
                <select name='userId' id="postAuthor" value={post.userId} onChange={inputEvent}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <button disabled={!canSave} type='submit'>Submit</button>
            </form>
        </section>
    )
}

export default AddPostForm