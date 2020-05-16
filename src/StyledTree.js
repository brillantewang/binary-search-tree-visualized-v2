import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components/macro';

const TreeContainer = styled.div`
  height: 100vh;
`;

const buildBlankNode = () => ({
  name: '',
  nodeSvgShape: {
    shape: 'circle',
    shapeProps: {
      r: 0,
    }
  }
})

const treeDefaultData = [
  {
    name: 'whoa',
    children: [
      {
        name: 'okay',
        children: [
          buildBlankNode(),
          {
            name: 'haha',
            children: [
              buildBlankNode(),
              {
                name: 'huh',
              },
            ]
          },
        ]
      },
      buildBlankNode()
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
  x: 0,
  y: 0
};

const StyledTree = () => {
  const treeContainerEl = useRef(null);
  const [translate, setTranslate] = useState(null);

  const getPathsToBlankNodes = () => {
    const blankCircles = document.querySelectorAll('circle[r="0"]');
    const blankNodeIds = [...blankCircles].map(circle => circle.parentNode.id);

    return blankNodeIds.map(id => document.querySelector(`path[data-target-id="${id}"`))
  };

  const hidePathsToBlankNodes = () => {
    // We can have blank nodes in the tree to act as sibling placeholders.
    // That allows single child nodes to be offset from their parents instead of
    // directly below (the default behavior for react-d3-tree). But we need to hide
    // the paths to these blank nodes.
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
      hidePathsToBlankNodes();
    };

    setupTree();
  }, []);

  return (
    <TreeContainer ref={treeContainerEl}>
      {translate &&
        <Tree
          data={treeDefaultData}
          orientation='vertical'
          pathFunc='straight'
          translate={translate}
          styles={styles}
          nodeSvgShape={nodeSvgShape}
          textLayout={textLayout}
          onUpdate={hidePathsToBlankNodes}
        />
      }
    </TreeContainer>
  )
};

export default StyledTree;
