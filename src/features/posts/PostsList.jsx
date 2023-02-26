import React from 'react'
import { useSelector } from 'react-redux'
import PostBody from './PostBody';

const PostsList = () => {

    // const dispatch = useDispatch();
    const postsStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    const posts = useSelector(state => state.posts.posts);

    let content;
    if (postsStatus === 'loading') {
        content = <p>Loading....</p>
    }
    else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostBody key={post.id} post={post} />)
    }
    else if (postsStatus === 'failed') {
        content = <p>{error}</p>
    }

    return (
        <section className='postSection'>
            {content}
        </section>
    )
}

export default PostsList