import React, { useCallback } from 'react';
import CommomComment from './CommomComment';
import ReplyComment from './ReplyComment';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, patchComment } from '../store/commentSlice';
import styled from 'styled-components';
import AnswerComment from './AnswerComment';

const Wrapper = styled.section`
  max-width: 700px
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;

  .main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .answer_comment {
    margin-top: 50px;
    flex: 0 0 auto;
  }
`;

const Layout = () => {
  const comments = useSelector(state => state.comments.comment);

  const dispatch = useDispatch();

  const { error, status } = useSelector(state => state.comments);

  console.log('comms', comments);
  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <Wrapper>
      <div className="main">
        {comments.map(comment => (
          <CommomComment
            id={comment.id}
            key={comment.id}
            createdAt={comment.createdAt}
            username={comment.user.username}
            image={comment.user.image.webp}
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
      </div>

      <div className="answer_comment">
        <AnswerComment />
      </div>
    </Wrapper>
  );
};

export default Layout;
