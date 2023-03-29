import React, { useState } from 'react';
import styled from 'styled-components';

import { removeNewComment, changeContent } from '../store/commentSlice';

import { useSelector, useDispatch } from 'react-redux';

import minus from '../images/icon-minus.svg';
import plus from '../images/icon-plus.svg';
import reply from '../images/icon-reply.svg';
import delete_icon from '../images/icon-delete.svg';
import edit_icon from '../images/icon-edit.svg';
import AnswerComment from './AnswerComment';
import UnderReplyComment from './UnderReplyComment';

const Comment = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 700px;
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: 12px 12px 8px 0px rgba(34, 60, 80, 0.2);
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  color: var(--color-blue);
  background-color: #e8e6e6;
  img {
    cursor: pointer;
  }
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  flex-grow: 30;
`;
const MainInfo_top = styled.div`
  display: flex;
  flex-direction: row;
  aling-items: center;
  justify-content: flex-start;
  gap: 10px;
  img {
    width: 50px;
    height: 50px;
  }
  p:nth-child(2) {
    font-weight: bold;
  }
`;
const MainInfo_Content = styled.div`
  font-size: 18px;
  color: #7a7979;
`;

const Reply = styled.div`
  height: 100%;
  display: flex;
  align-items: baseline;
  justify-self: flex-end;
  gap: 5px;
  color: ${props => props.color};
  cursor: pointer;
  flex-grow: 3;
`;

const WrapperReply = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 50px;
  margin-left: 100px;
`;

const CommomComment = ({
  id,
  content,
  createdAt,
  score,
  image,
  username,
  children,
}) => {
  const comments = useSelector(state => state.comments.comment);
  const dispatch = useDispatch();
  // const [repl, setRepl] = useState([])

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  function filterArr(id, arr) {
    let currentComment = arr.find(com => com.id === id);
    console.log('curr com: ', currentComment, id);

    // let exampleCom = {
    //   content: 'tests123',
    //   createdAt: 'sec ago',
    //   id: uuidv4(),
    //   replyingTo: currentComment.user.username,
    //   score: 0,
    //   user: {
    //     image: '',
    //     username: 'juliusoma',
    //   },
    // };
  }

  return (
    <>
      <Comment>
        <Score>
          <img src={plus} alt="plus" />
          <p>{score}</p>
          <img src={minus} alt="minus" />
        </Score>

        <MainInfo>
          <MainInfo_top>
            <img src={image} alt="image" />
            <p>{username}</p>
            <p>{createdAt}</p>
          </MainInfo_top>
          <MainInfo_Content>
            <p>{content}</p>
          </MainInfo_Content>
        </MainInfo>

        {/* onClick={handleToggle} */}
        {username === 'juliusomo' ? (
          <>
            <Reply
              color="var(--color-soft-red)"
              onClick={() => dispatch(removeNewComment(id))}
            >
              <img src={delete_icon} alt="delete" />
              <h4>Delete</h4>
            </Reply>

            <Reply
              color="var(--color-blue)"
              onClick={() => handleToggle()}
              // onClick={() => changeContent(id)}
            >
              <img src={edit_icon} alt="edit" />
              <h4>Edit</h4>
            </Reply>

            {toggle ? (
              <UnderReplyComment id={id}/>
            ) : undefined}

          </>
        ) : (
          <Reply
            color="var(--color-dark-blue)"
            onClick={() => {
              filterArr(id, comments);
            }}
          >
            <img src={reply} alt="reply" />
            <h4>Reply</h4>
          </Reply>
        )}
      </Comment>
      <WrapperReply>{children}</WrapperReply>
      {/* {toggle ? <AnswerComment onReply={username} /> : undefined} */}
    </>
  );
};

export default CommomComment;
