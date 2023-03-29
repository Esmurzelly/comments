import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
// import { changeContent } from '../store/commentSlice';

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
        // onClick={() => {
        //   dispatch(changeContent(id));
        // }}
      >
        Apply
      </button>
    </>
  );
};

export default UnderReplyComment;
