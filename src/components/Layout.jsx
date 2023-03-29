import React from 'react';
import CommomComment from './CommomComment';
import ReplyComment from './ReplyComment';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../store/commentSlice';
import styled from 'styled-components';
import AnswerComment from './AnswerComment';

const Wrapper = styled.section`
  max-width: 700px
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 50px;
`;

const Layout = () => {
  const comments = useSelector(state => state.comments.comment);
  const dispatch = useDispatch();

  const { error, status } = useSelector(state => state.comments);
console.log('comms', comments)
  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <Wrapper>
      {comments.map(comment => (
        <CommomComment
          id={comment.id}
          key={comment.id}
          createdAt={comment.createdAt}
          username={comment.user.username}
          image={comment.user.image.png}
          content={comment.content}
          score={comment.score}
        >
          {comment.replies.length > 0 ? (
            <>
              {comment.replies.map(reply => (
                <ReplyComment
                  key={reply.id}
                  id={reply.id}
                  content={reply.content}
                  createdAt={reply.createdAt}
                  image={reply.user.image.png}
                  score={reply.score}
                  username={reply.user.username}
                  replyingTo={reply.replyingTo}
                />
              ))}
            </>
          ) : (
            ''
          )}
        </CommomComment>
      ))}
      <AnswerComment/>
    </Wrapper>
  );
};

export default Layout;
