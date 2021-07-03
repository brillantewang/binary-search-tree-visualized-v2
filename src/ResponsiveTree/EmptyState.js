import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0 20px;
`;

const Welcome = styled.div`
  text-align: center;
  font-size: 20px;
`;

const Instructions = styled.div`
  margin-top: 12px;
  font-size: 14px;
`;

const EmptyState = () => {
  return (
    <Root>
      <Welcome>whats gud boii welcome to Binary Search Tree Visualized</Welcome>
      <Instructions>start by inserting a root value</Instructions>
    </Root>
  );
};

export default EmptyState;
