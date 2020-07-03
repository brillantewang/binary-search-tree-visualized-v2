import React, { useState, useEffect } from 'react';
import StyledTree from '../StyledTree';
import styled from 'styled-components/macro';
import {
  hidePathsToBlankNodes,
  getTreeDimensions,
  getRootNodeDimensions,
  getTreeContainerPadding,
} from './util';
import PropTypes from 'prop-types';

const TreeContainer = styled.div`
  height: ${props => `${props.height}px`};
  width: ${props => `${props.width}px`};
  min-height: 100vh;
`;

const Mobile = ({ treeData }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeContainerDimensions, setTreeContainerDimensions] = useState({ height: 0, width: 0 });
  
  // useEffect(() => {
  //   onmousemove = function(e){console.log("mouse location:", e.clientX, e.clientY)};
  // }, [])

  const resizeTreeContainer = () => {
    // We resize the tree container based on the newly updated size of the tree
    const treeDimensions = getTreeDimensions();
    const treeContainerPadding = getTreeContainerPadding(treeDimensions);

    setTreeContainerDimensions({
      height: treeDimensions.height + treeContainerPadding.vertical,
      width: treeDimensions.width + treeContainerPadding.horizontal,
    });
  };

  const positionTree = () => {
    // We position the tree to be flush with the tree container
    const rootNodeDimensions = getRootNodeDimensions();
    const treeDimensions = getTreeDimensions();
    const rootNodeOffsetLeft = rootNodeDimensions.left - treeDimensions.left;
    const xPosition = rootNodeOffsetLeft + (rootNodeDimensions.width / 2);
    const treeContainerPadding = getTreeContainerPadding(treeDimensions);

    setTranslate({
      x: xPosition + (treeContainerPadding.horizontal / 2),
      y: treeContainerPadding.vertical / 2,
    });
  };

  const adjustContainerSizeAndTreePosition = () => {
    // We wait one second to give enough time for the tree g element to newly render first
    setTimeout(() => {
      resizeTreeContainer();
      positionTree();
    }, 1000);
  }

  useEffect(() => {
    adjustContainerSizeAndTreePosition();
  }, [treeData]);

  const onUpdate = event => {
    // Toggling (aka expanding/collapsing) a node will cause react-d3-tree to fully re-create
    // the new tree, including the paths to blank nodes again. So we need to hide them.
    hidePathsToBlankNodes();
    if (event.node) adjustContainerSizeAndTreePosition();
  }

  return (
    <TreeContainer height={treeContainerDimensions.height} width={treeContainerDimensions.width}>
      <StyledTree
        data={treeData}
        translate={translate}
        zoomable={false}
        onUpdate={onUpdate}
      />
    </TreeContainer>
  )
};

Mobile.propTypes = {
  treeData: PropTypes.object,
};

export default Mobile;
