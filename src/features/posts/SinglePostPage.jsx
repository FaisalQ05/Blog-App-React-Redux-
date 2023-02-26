import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const SinglePostPage = () => {

    const { postId } = useParams()
    const PostById = useSelector(state => {
        return state.posts.posts.find(x => x.id == Number(postId))
    })
    if (!PostById) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return (
        <section className='postSection'>
            <article className='postBody'>
                <h2 className='postTitle'>{PostById.title}</h2>
                <p className='postContent'>{PostById.body}</p>
                <Link className='postLink' to={`/post/edit/${PostById.id}`}>Edit Post</Link>
                <PostAuthor userId={PostById.userId} />
                <TimeAgo timeStamp={PostById.date} />
            </article>
        </section>
    )
}

export default SinglePostPage