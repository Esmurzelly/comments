import React, { useState } from 'react';
import styled from 'styled-components';


import minus from '../images/icon-minus.svg';
import plus from '../images/icon-plus.svg';
import reply from '../images/icon-reply.svg';
import AnswerComment from './AnswerComment';

const Comment = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 700px;
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
  gap: 5px;
  color: purple;
  cursor: pointer;
`;

const WrapperReply = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 50px;
  margin-left: 100px;
`;

const CommomComment = ({
  content,
  createdAt,
  score,
  image,
  username,
  children,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

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

        <Reply onClick={handleToggle}>
          <img src={reply} alt="reply" />
          <h4>Reply</h4>
        </Reply>
      </Comment>
      <WrapperReply>{children}</WrapperReply>
      {toggle ? <AnswerComment onReply={username} /> : undefined}
    </>
  );
};

export default CommomComment;
