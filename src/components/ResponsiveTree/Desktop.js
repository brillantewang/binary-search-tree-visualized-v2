import React, { useState, useRef, useEffect } from 'react';
import StyledTree from '../StyledTree';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const TreeContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Desktop = ({ treeData }) => {
  const treeContainerEl = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  
  const centerTree = () => {
    const dimensions = treeContainerEl.current.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 2
    });
  }

  useEffect(() => {
    centerTree();
  }, []);

  return (
    <TreeContainer ref={treeContainerEl}>
      <StyledTree
        data={treeData}
        translate={translate}
      />
    </TreeContainer>
  )
};

Desktop.propTypes = {
  treeData: PropTypes.object,
};

export default Desktop;
