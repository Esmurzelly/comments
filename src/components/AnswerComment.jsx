import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import avatar from '../images/avatars/image-juliusomo.webp';

import { useDispatch } from 'react-redux';

import { fetchMainUser, addNewComment } from '../store/commentSlice';

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  background-color: #fff;
  gap: 10px;
  padding: 30px;
  border-radius: var(--radius);
  box-shadow: 12px 12px 8px 0px rgba(34, 60, 80, 0.2);
  margin-left: 50px;
  width: 750px;
`;
const AnwerInput = styled.input`
  padding: 30px;
  width: 100%;
  border-radius: 10px;
`;
const Button = styled.button`
  background-color: var(--color-blue);
  color: #fff;
  font-size: var(--fs-md);
  padding: 10px;
  border-radius: 10px;
  width: 140px;
  text-transform: uppercase;
`;

const AnswerComment = ({onReply}) => {
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();

  const addComment = () => {
    dispatch(addNewComment(answer))
    setAnswer('')
  };

  useEffect(() => {
    dispatch(fetchMainUser());
  }, [dispatch]);

  return (
    <AnswerWrapper>
      <img width={50} src={avatar} alt="avatar" />
      <AnwerInput
        type="text"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
      />
      <Button onClick={addComment}>Reply</Button>
    </AnswerWrapper>
  );
};

export default AnswerComment;
