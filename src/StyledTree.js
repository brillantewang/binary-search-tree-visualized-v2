import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components/macro';
import cloneDeep from 'clone-deep';

const TreeContainer = styled.div`
  height: 100vh;
`;

const treeDefaultData = {
  name: '12',
  children: [
    {
      name: '8',
      children: [
        {
          name: '15',
          children: [
            {
              name: '3',
            },
          ]
        },
        {
          name: '19',
        },
      ]
    },
  ]
};

const nodeStyle = {
  circle: {
    stroke: 'white',
    fill: '#162447',
  },
  name: {
    stroke: 'white',
    fill: 'white',
  },
}

const styles = {
  links: {
    stroke: 'white',
  },
  nodes: {
    node: nodeStyle,
    leafNode: nodeStyle,
  }
};

const nodeSvgShape = {
  shape: 'circle',
  shapeProps: {
    r: 40,
  },
};

const textLayout = {
  textAnchor: 'middle',
  x: 0,
  y: 0
};

const StyledTree = () => {
  const treeContainerEl = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeData, setTreeData] = useState(treeDefaultData);

  const buildBlankNode = () => ({
    name: '',
    nodeSvgShape: {
      shape: 'circle',
      shapeProps: {
        r: 0,
      }
    }
  })

  const insertBlankChildNode = (node) => {
    const childNode = node.children[0];
    const blankNode = buildBlankNode();
    if (parseInt(childNode.name) < parseInt(node.name)) {
      node.children.push(blankNode);
    } else {
      node.children.unshift(blankNode);
    }
  }

  const insertBlankChildrenNodesRecursively = node => {
    const children = node.children || [];
    children.forEach(child => insertBlankChildrenNodesRecursively(child));
    if (children.length === 1) insertBlankChildNode(node);
  }

  const insertBlankPlaceholderNodes = () => {
    // We insert blank nodes in the tree to act as sibling placeholders.
    // That allows single child nodes to be offset from their parents instead of
    // directly below (the default behavior for react-d3-tree).
    const treeDataCopy = cloneDeep(treeData);
    insertBlankChildrenNodesRecursively(treeDataCopy);
    setTreeData(treeDataCopy);
  };

  const getPathsToBlankNodes = () => {
    const blankCircles = document.querySelectorAll('circle[r="0"]');
    const blankNodeIds = [...blankCircles].map(circle => circle.parentNode.id);
    return blankNodeIds.map(id => document.querySelector(`path[data-target-id="${id}"`))
  };

  const hidePathsToBlankNodes = () => {
    const pathsToBlankNodes = getPathsToBlankNodes();
    pathsToBlankNodes.forEach(path => path.style.strokeWidth = "0");
  };
  
  const centerTree = () => {
    const dimensions = treeContainerEl.current.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 2
    });
  }

  useEffect(() => {
    // https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
    async function setupTree() {
      await centerTree();
      insertBlankPlaceholderNodes();
      hidePathsToBlankNodes();
    };

    setupTree();
  }, []);

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

export default StyledTree;
