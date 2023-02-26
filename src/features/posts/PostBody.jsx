import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import { Link } from 'react-router-dom'

const PostBody = ({ post }) => {
  return (
    <article className='postBody'>
      <h2 className='postTitle'>{post.title}</h2>
      <p className='postContent'>{post.body}</p>
      <Link className='postLink' to={`post/${post.id}`}>View Post</Link>
      <PostAuthor userId={post.userId} />
      <TimeAgo timeStamp={post.date} />
    </article>
  )
}

export default PostBody