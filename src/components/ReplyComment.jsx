import React from 'react';

const ReplyComment = ({id, content, createdAt, score, image, username, replyingTo}) => {
  return (
    <ol>
        <p>id: {id}</p>
        <p>{content}</p>
        <p>{createdAt}</p>
        <p>{score}</p>
        <img src={image} alt="image" />
        <p>{username}</p>
        <p>Reply to {replyingTo}</p>
      </ol>
  )
}

export default ReplyComment