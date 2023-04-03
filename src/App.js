import './App.css';
import Layout from './components/Layout';
import styled from 'styled-components';

// come to russian tutorial

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #e8e6e6;
  min-height: 100vh;
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
