import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components/macro';
import cloneDeep from 'clone-deep';
import {
  insertBlankNodesRecursively,
  hidePathsToBlankNodes,
  getTreeDimensions,
  getRootNodeDimensions,
  getTreeContainerPadding,
} from './util';
import {
  treeDefaultData,
  styles,
  nodeSvgShape,
  textLayout,
} from './constants';
import PropTypes from 'prop-types';

const TreeContainer = styled.div`
  height: ${props => `${props.height}px`};
  width: ${props => `${props.width}px`};
  min-height: 100vh;
`;

const Mobile = ({ rawTreeData }) => {
  const treeContainerEl = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeData, setTreeData] = useState({});
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
    const insertBlankPlaceholderNodes = () => {
      // We insert blank nodes in the tree to act as sibling placeholders.
      // That allows single child nodes to be offset from their parents instead of
      // positioned directly below (the default behavior for react-d3-tree).
      const newTreeData = cloneDeep(rawTreeData);
      insertBlankNodesRecursively(newTreeData);
      setTreeData(newTreeData);
    };

    insertBlankPlaceholderNodes();
  }, [rawTreeData])

  useEffect(() => {
    // After we insert blank placeholder nodes, we also need to hide their paths.
    hidePathsToBlankNodes();
    adjustContainerSizeAndTreePosition();
  }, [treeData]);

  const onUpdate = event => {
    // Toggling (aka expanding/collapsing) a node will cause react-d3-tree to fully re-create
    // the new tree, including the paths to blank nodes again. So we need to hide them.
    hidePathsToBlankNodes();
    if (event.node) adjustContainerSizeAndTreePosition();
  }

  return (
    <TreeContainer
      ref={treeContainerEl}
      height={treeContainerDimensions.height}
      width={treeContainerDimensions.width}
    >
      <Tree
        data={treeData}
        orientation='vertical'
        pathFunc='straight'
        translate={translate}
        styles={styles}
        nodeSvgShape={nodeSvgShape}
        textLayout={textLayout}
        zoomable={false}
        onUpdate={onUpdate}
      />
    </TreeContainer>
  )
};

Mobile.propTypes = {
  rawTreeData: PropTypes.object,
};

Mobile.defaultProps = {
  rawTreeData: treeDefaultData,
};

export default Mobile;
