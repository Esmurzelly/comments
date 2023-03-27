import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

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
)

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comment: [],
        status: null,
        error: null
    },
    reducers: {},
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

// const {} = commentSlice.actions // export functions
export default commentSlice.reducer