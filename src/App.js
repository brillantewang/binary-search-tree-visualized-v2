import React from 'react';
import styled from 'styled-components/macro';
import BinarySearchTree from './BinarySearchTree';

const Root = styled.div`
  background: #162447;
  height: 100vh;
  display: flex;
`;

const App = () => (
  <Root>
    <BinarySearchTree />
  </Root>
)

export default App;
