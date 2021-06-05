import React from 'react';
import styled from 'styled-components/macro';
import ResponsiveTree from './ResponsiveTree';
import { breakpoints } from './breakpoints';
import GlobalStateProvider from './store/GlobalStateProvider';
import StartScreen from './StartScreen';

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
  <GlobalStateProvider>
    <Root>
      <StartScreen />
      <ResponsiveTree />
    </Root>
  </GlobalStateProvider>
);

export default App;
