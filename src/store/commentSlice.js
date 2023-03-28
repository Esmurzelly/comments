import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const baseURL_comments = 'http://localhost:3500/comments';
const baseURL_user = 'http://localhost:3500/currentUser';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(baseURL_comments);

            if(!response.ok) {
                throw new Error("Server Error")
            }

            const data = await response.json();
            console.log('data ', data)
            return data
        } catch(e) {
            return rejectWithValue(e.message)
        }
    }
);

export const fetchMainUser = createAsyncThunk(
    'user/fetchMainUser',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch(baseURL_user);
            const user = await response.json();
            console.log('user', user);
            return user;
        } catch(e) {
            return rejectWithValue(e.message)
        }
    }
);

export const addNewComment = createAsyncThunk(
    'comments/addComment',
    async function(text, {rejectWithValue, dispatch}) {
        try {
            const comment = {
                id: uuidv4(),
                content: text,
                createdAt: "few seconds ago",
                replies: [],
                score: 0,
                user: {
                    image: '../images/avatars/image-juliusomo.webp',
                    username: "juliusomo"
                }
            };

            const response = await fetch(baseURL_comments, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment)
            });

            if (!response.ok) {
                throw new Error("Can't add task. Server Error!");
            }
            const data = await response.json();
            dispatch(addComment(data));
            console.log(comment)

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comment: [],
        status: null,
        error: null
    },
    reducers: {
        addComment(state, action) {
            state.comment.push(action.payload);
        }
    },
    extraReducers: {
        [fetchComments.pending]: state => {
            state.status = 'loading...';
            state.error = null
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.comment = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.status = 'rejected...';
            state.error = action.payload
        }
    }
})

const { addComment } = commentSlice.actions;
export default commentSlice.reducer