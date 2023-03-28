import './App.css';
import Layout from './components/Layout';
import styled from 'styled-components';

// come to russian tutorial
// identify by id of post
// make a example post
// build common answer comment (like footer) 

const Wrapper = styled.div`
  width: 100%;
  background-color: #e8e6e6;
  height: 100%;
  padding: 50px;
`;

function App() {
  return (
    <Wrapper>
      <Layout />
    </Wrapper>
  );
}

export default App;
