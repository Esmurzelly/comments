import React from 'react';
import CommomComment from './CommomComment';
import ReplyComment from './ReplyComment';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../store/commentSlice';

const Layout = () => {
  const comments = useSelector(state => state.comments.comment);
  const dispatch = useDispatch();
  const { error, status } = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);
  return (
    <ul>
      {comments.map(comment => (
        <CommomComment
          key={comment.id}
          id={comment.id}
          createdAt={comment.createdAt}
          username={comment.user.username}
          image={comment.user.image.png}
          content={comment.content}
        >
          {comment.replies.length > 0 ? (
            <>
                <p>Replies: </p>
                {comment.replies.map(reply => (
                    <ReplyComment key={reply.id} id={reply.id} content={reply.content} createdAt={reply.createdAt} image={reply.user.image.png} score={reply.score} username={reply.user.username} replyingTo={reply.replyingTo} />
                ))}
            </>
          ) : (
            ''
          )}
        </CommomComment>
      ))}
    </ul>
  );
};

export default Layout;
