import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersPage = () => {
    const { userId } = useParams();
    console.log(userId)
    const selectUserById = useSelector(
        (state) => state.users.find(x => x.id === Number(userId)))

    console.log(selectUserById)
    const allposts = useSelector(state => state.posts.posts)
    // console.log(allposts)

    const postforUser = useSelector(state => {
        const allposts = state.posts.posts
        return allposts.filter(post => post.userId === Number(userId))
    })

    const postTitles = postforUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    let content;
    if (selectUserById) {
        content = <section className='userPostHistory'>
            <h1>{`All posts by ${selectUserById.name}`}</h1>
            {postTitles.length > 0 ? postTitles : <h2>User don,t have posts</h2>}
        </section>
    }
    if (!selectUserById) {
        content = '.......Loading'
    }

    return content
}

export default UsersPage