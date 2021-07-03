import React from 'react';
import styled from 'styled-components';
import Insert from './Insert';

const Root = styled.div`
  color: white;
  position: fixed;
  left: 10px;
  top: 12px;
`;

const ControlPanel = () => {
  return (
    <Root>
      <Insert />
    </Root>
  );
};

export default ControlPanel;
