import React, { useState, useEffect, useCallback } from 'react';
import StyledTree from '../StyledTree';
import styled from 'styled-components/macro';
import {
  getTreeDimensions,
  getRootNodeDimensions,
} from './util';
import PropTypes from 'prop-types';

const TreeContainer = styled.div`
  height: ${props => `${props.height}px`};
  width: ${props => `${props.width}px`};
  min-height: 100vh;

  svg {
    /* Allows the tree to 'extend' past the bounds of the svg
      while waiting for the tree container to resize */
    overflow: visible;
  }

  circle[r="0"] + g {
    /* For some reason in Safari, the sibling g element of the blank circle
    is given a 2x2 height and width.

    So whenever the tree g element width gets calculated, it seems to take into account
    this g element because it's taking up some space. However we don't want the width
    to take into acccount any blank nodes because then the width might be unnecessarily wide
    if a blank node is at the edge, making it look like there's extra horizontal padding.
    So we give this g element display: none in order to essentially remove it from the
    document so it no longer takes up space.

    This seems to allow the tree g element width calculation to no longer take it into
    account, giving us a width that's not overly wide in these 'blank node at the edges'
    scenarios. */
    display: none;
  }
`;

const treeContainerPadding = {
  top: 200,
  right: 20,
  bottom: 200,
  left: 20,
};

const Mobile = ({ treeData }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeContainerDimensions, setTreeContainerDimensions] = useState({ height: 0, width: 0 });

  const resizeTreeContainer = () => {
    // We resize the tree container based on the newly updated size of the tree
    const treeDimensions = getTreeDimensions();

    setTreeContainerDimensions({
      height: treeContainerPadding.top + treeDimensions.height + treeContainerPadding.bottom,
      width: treeContainerPadding.left + treeDimensions.width + treeContainerPadding.right,
    });
  };

  const positionTree = () => {
    // We position the tree to be flush with the tree container
    const rootNodeDimensions = getRootNodeDimensions();
    const treeDimensions = getTreeDimensions();
    const rootNodeOffsetLeft = rootNodeDimensions.left - treeDimensions.left;
    const rootNodeRadius = rootNodeDimensions.width / 2;
    const rootNodeXPositionInTree = rootNodeOffsetLeft + rootNodeRadius;

    setTranslate({
      x: rootNodeXPositionInTree + treeContainerPadding.left,
      y: treeContainerPadding.top,
    });
  };

  // We wrap this in useCallback so we can pass it as a dependency to useEffect and
  // prevent the 'react-hooks/exhaustive-deps' warning.
  const adjustContainerSizeAndTreePosition = useCallback(() => {
    // We wait one second to give enough time for the tree g element to newly render first
    setTimeout(() => {
      resizeTreeContainer();
      positionTree();
    }, 1000);
  }, []);

  useEffect(() => {
    adjustContainerSizeAndTreePosition();
  }, [treeData, adjustContainerSizeAndTreePosition]);

  const onUpdate = event => {
    // We only adjust if event.node exists, aka it's a node toggle event. We don't
    // care about other events.
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
