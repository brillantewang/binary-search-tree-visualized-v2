import React from 'react';
import styled from 'styled-components';
import InsertOrDelete from './InsertOrDelete';

const Root = styled.div`
  color: white;
  position: fixed;
  left: 10px;
  top: 12px;
`;

const ControlPanel = () => {
  // might add more features to this in the future
  // like traversals, etc
  return (
    <Root>
      <InsertOrDelete />
    </Root>
  );
};

export default ControlPanel;
