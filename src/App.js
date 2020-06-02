import React from 'react';
import styled from 'styled-components/macro';
import StyledTree from './StyledTree';
import { breakpoints } from './breakpoints';

const Root = styled.div`
  background: #162447;

  @media (max-width: ${breakpoints.tablet}px) {
    min-width: 100vw;
    display: flex;
    justify-content: center;
    width: fit-content;
  }
`;

const App = () => (
  <Root>
    <StyledTree />
  </Root>
);

export default App;
