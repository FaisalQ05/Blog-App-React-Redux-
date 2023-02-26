import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    console.log("initialPost :", initialPost)
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
    return response.data
})
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    console.log(initialPost)
    const { id } = initialPost;
    const response = await axios.delete(`${POSTS_URL}/${id}`)
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
})


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            let min = 1
            state.status = 'succeeded'
            // state.posts = action.payload
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                return post
            })
            // console.log("loadedPosts from post slice : ", loadedPosts);
            state.posts = [...loadedPosts]
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            console.log("action.payload ", action.payload)
            action.payload.id = state.posts[state.posts.length - 1].id + 1;

            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString();
            console.log("action payload", action.payload)
            state.posts.push(action.payload)
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            if (!action.payload.id) {
                console.log("Update action could not complete")
                console.log(action.payload)
                return
            }
            const { id } = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter(post => post.id !== id);
            console.log("update post : ", action.payload)
            state.posts = [...posts, action.payload];
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            console.log(action.payload)
            if (!action.payload.id) {
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = posts;
        })
    }
})


export default postsSlice.reducer