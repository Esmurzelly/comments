import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import sub from 'date-fns/sub';
import { subMinutes, formatDistance, formatDistanceToNow } from 'date-fns';

const baseURL_comments = 'http://localhost:3500/comments';
const baseURL_user = 'http://localhost:3500/currentUser';

// const postAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.date.localeCompare(a.date),
// });
// const initialState = postAdapter.getInitialState();

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(baseURL_comments);

      if (!response.ok) {
        throw new Error('Server Error');
      }

      const data = await response.json();
      console.log('data ', data);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchMainUser = createAsyncThunk(
  'user/fetchMainUser',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(baseURL_user);
      const user = await response.json();
      console.log('user', user);
      return user;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  async function (text, { rejectWithValue, dispatch }) {
    let min = 1;
    let currentDate = new Date();
    try {
      const comment = {
        id: uuidv4(),
        content: text,
        createdAt: formatDistanceToNow(currentDate, currentDate),
        // createdAt: sub(new Date(), { minutes: min++ }).toISOString(),
        replies: [],
        score: 0,
        user: {
          image: {
            png: '../images/avatars/image-juliusomo.png',
            webp: '../images/avatars/image-juliusomo.webp',
          },
          username: 'juliusomo',
        },
      };

      const response = await fetch(baseURL_comments, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      if (!response.ok) {
        throw new Error("Can't add task. Server Error!");
      }
      const data = await response.json();
      dispatch(addComment(data));
      console.log(comment);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeNewComment = createAsyncThunk(
  'comments/removeNewComment',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${baseURL_comments}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Can't delete comment. Server Error!");
      }

      dispatch(removeComment({ id }));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const increaseScore = createAsyncThunk(
  'comments/increaseScore',
  async function(id, {rejectWithValue, dispatch, getState}) {
    const comment = getState().comments.comment.find(com => com.id === id);
  
    try {
      const response = await fetch(
        `${baseURL_comments}/${id}`,
        {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify({
            score: comment.score + 1
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can't delete status. Server Error!");
      }

      dispatch(increaseNewScore({id}));
    } catch(e) {
      return rejectWithValue(e.message)
    }
  }
);

export const decreaseScore = createAsyncThunk(
  'comments/increaseScore',
  async function(id, {rejectWithValue, dispatch, getState}) {
    const comment = getState().comments.comment.find(com => com.id === id);
  
    try {
      const response = await fetch(
        `${baseURL_comments}/${id}`,
        {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: comment.score - 1
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can't delete status. Server Error!");
      }

      dispatch(decreaseNewScore({id}));
    } catch(e) {
      return rejectWithValue(e.message)
    }
  }
);

export const patchComment = createAsyncThunk(
  'comments/patchComment',
  async function(id, {rejectWithValue, dispatch, getState}) {
    const comment = getState().comments.comment.find(com => com.id === id);

    try {
      const response = await fetch(
        `${baseURL_comments}/${id}`,
          {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: comment.content
            })
          }
        );

        if (!response.ok) {
          throw new Error("Can't delete status. Server Error!");
        }

        dispatch(patchNewComment({id}))

    } catch (e) {
      return rejectWithValue(e.message)
    }

  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comment: [],
    status: null,
    error: null,
  },
  reducers: {
    addComment(state, action) {
      state.comment.push(action.payload);
    },
    removeComment(state, action) {
      state.comment = state.comment.filter(com => com.id !== action.payload.id);
    },
    increaseNewScore(state, action) {
      const patchedScoreCommment = state.action.find(
        com => com.id === action.payload.id
      );
      patchedScoreCommment.score += 1; 
    },
    decreaseNewScore(state, action) {
      const patchedScoreCommment = state.action.find(
        com => com.id === action.payload.id
      );
      patchedScoreCommment.score -= 1; 
    },
    patchNewComment(state, action) {
      const patchedContentCommment = state.action.find(
        com => com.id === action.payload.id
      );
      patchedContentCommment.content = "test async await"
    }
  },
  extraReducers: {
    [fetchComments.pending]: state => {
      state.status = 'loading...';
      state.error = null;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.comment = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = 'rejected...';
      state.error = action.payload;
    },

    // [patchComment.pending]: (state) => {
    //   state.status = 'loading...';

    // },
    // [patchComment.fulfilled]: (state, { payload }) => {
    //   (state.status = 'resolved');
    //     commentAdapter.updateOne(state, {
    //       id: payload.id,
    //       changes: payload.changes,
    //     });
    // },
  },
});

const { addComment, removeComment, increaseNewScore, decreaseNewScore, patchNewComment } =
  commentSlice.actions;
export default commentSlice.reducer;
