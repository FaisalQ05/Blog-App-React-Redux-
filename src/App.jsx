import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AddPostForm from './features/posts/AddPostForm';
import EditPostPage from './features/posts/EditPostPage';
import PostsList from './features/posts/PostsList';
import SinglePostPage from './features/posts/SinglePostPage';
import UsersList from './features/users/UsersList';
import UsersPage from './features/users/UsersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostPage />} />
        </Route>

        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UsersPage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
