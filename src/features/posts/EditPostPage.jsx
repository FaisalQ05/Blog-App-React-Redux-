import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updatePost, deletePost } from './postsSlice'
import { useState } from 'react'


const EditPostPage = () => {
    const navigate = useNavigate();
    const { postId } = useParams()
    const [requestStatus, setRequestStatus] = useState('idle')
    const dispatch = useDispatch()
    const PostById = useSelector(state => {
        return state.posts.posts.find(x => x.id == Number(postId))
    })
    // console.log(PostById)
    const [post, setPost] = useState({
        title: PostById?.title,
        content: PostById?.body,
        userId: PostById?.userId
    })


    const inputEvent = (e) => {
        setPost(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }
    const canSave = [post.title, post.content, post.userId].every(Boolean) && requestStatus === 'idle';

    const users = useSelector(x => x.users)
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))


    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (canSave) {
            const { title, content, userId } = post
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: PostById.id, title, body: content, userId })).unwrap()

                setPost({
                    title: '',
                    content: '',
                    userId: ''
                })
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const onDeletePostClicked = (e) => {
        e.preventDefault()
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: PostById.id })).unwrap()

            setPost({
                title: '',
                content: '',
                userId: ''
            })
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section className='addPostSection'>
            <h1>Edit post</h1>
            <form onSubmit={handleSubmit}>
                <input name='title' value={post.title} placeholder='Post Title' type="text" id='postTitle' onChange={inputEvent} />
                <textarea name='content' value={post.content} placeholder='Post Content' type="text" id='postContent' onChange={inputEvent} />
                <select name='userId' id="postAuthor" value={post.userId} onChange={inputEvent}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <button disabled={!canSave} type='submit'>Submit</button>
                <button className='deleteButton' onClick={onDeletePostClicked}>Delete</button>
            </form>
        </section>
    )
}

export default EditPostPage