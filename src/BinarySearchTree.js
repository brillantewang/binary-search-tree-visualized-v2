import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components';

const TreeContainer = styled.div`
  width: 100vw;
`;

const TreeData = [
  {
    name: 'whoa',
    children: [
      {
        name: 'okay',
      },
      {
        name: 'alright',
      }
    ]
  }
];

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
          data={TreeData}
          orientation='vertical'
          translate={translate}
        />
      }
    </TreeContainer>
  )
};

export default BinarySearchTree;
