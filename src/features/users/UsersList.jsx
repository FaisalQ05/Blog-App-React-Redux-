import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UsersList = () => {

    const users = useSelector(state => state.users);
    console.log("users , ", users)
    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ));
    return (
        <>
            <section className='usersList'>
                {renderedUsers}
            </section>
        </>
    )
}

export default UsersList