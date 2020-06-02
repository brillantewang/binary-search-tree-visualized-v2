
import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components/macro';
import cloneDeep from 'clone-deep';
import { insertBlankNodesRecursively, hidePathsToBlankNodes } from './util';
import {
  treeDefaultData,
  styles,
  nodeSvgShape,
  textLayout,
} from './constants';
import PropTypes from 'prop-types';

const TreeContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Desktop = ({ rawTreeData }) => {
  const treeContainerEl = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeData, setTreeData] = useState({});
  
  const centerTree = () => {
    const dimensions = treeContainerEl.current.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 2
    });
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
    centerTree();
  }, [treeData]);

  return (
    <TreeContainer ref={treeContainerEl}>
      <Tree
        data={treeData}
        orientation='vertical'
        pathFunc='straight'
        translate={translate}
        styles={styles}
        nodeSvgShape={nodeSvgShape}
        textLayout={textLayout}
        onUpdate={hidePathsToBlankNodes}
      />
    </TreeContainer>
  )
};

Desktop.propTypes = {
  rawTreeData: PropTypes.object,
};

Desktop.defaultProps = {
  rawTreeData: treeDefaultData,
};


export default Desktop;
