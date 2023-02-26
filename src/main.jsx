import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fetchPosts } from './features/posts/postsSlice'
import { fetchUsers } from './features/users/usersSlice'

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>

    </BrowserRouter>
  </Provider>


)
