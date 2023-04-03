import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { patchComment } from '../store/commentSlice';

const UnderReplyComment = ({id}) => {
    const [testText, setTestsText] = useState('');
    const dispatch = useDispatch();
  return (
    <>
      <input
        type="text"
        value={testText}
        onChange={e => setTestsText(e.target.value)}
        width={200}
      />
      <button
        onClick={() => dispatch(patchComment(id))}
      >
        Apply
      </button>
    </>
  );
};

export default UnderReplyComment;
