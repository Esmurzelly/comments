import React from 'react';

const CommomComment = ({ id, content, createdAt, score, image, username, children }) => {
   return (
    <>
      <li>
        <p>id: {id}</p>
        <p>{content}</p>
        <p>{createdAt}</p>
        <p>{score}</p>
        <img src={image} alt="image" />
        <p>{username}</p>
      </li>

      {children}
    </>
    
  )
}

export default CommomComment