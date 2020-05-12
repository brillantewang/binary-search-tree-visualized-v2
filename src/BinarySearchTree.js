import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components';

const TreeContainer = styled.div`
  width: 100vw;
`;

const TreeDefaultData = [
  {
    name: 'whoa',
    children: [
      {
        name: 'okay',
        children: [
          {
            name: 'haha',
          },
        ]
      },
      {
        name: 'alright',
      }
    ]
  }
];

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
};

const BinarySearchTree = () => {
  const treeContainerEl = useRef(null);
  const [translate, setTranslate] = useState(null);

  useEffect(() => {
    // center the tree
    const dimensions = treeContainerEl.current.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 2
    });
  }, []);

  return (
    <TreeContainer ref={treeContainerEl}>
      {translate &&
        <Tree
          data={TreeDefaultData}
          orientation='vertical'
          pathFunc='straight'
          translate={translate}
          styles={styles}
          nodeSvgShape={nodeSvgShape}
          textLayout={textLayout}
        />
      }
    </TreeContainer>
  )
};

export default BinarySearchTree;
