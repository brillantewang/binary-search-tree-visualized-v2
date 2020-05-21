import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components/macro';
import cloneDeep from 'clone-deep';
import { insertBlankNodesRecursively, hidePathsToBlankNodes } from './util';
import PropTypes from 'prop-types';

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
          children: [
            {
              name: '11',
            },
            {
              name: '55',
              children: [
                {
                  name: '14',
                  children: [
                    {
                      name: '444',
                    }
                  ]
                }
              ]
            },
          ]
        },
      ]
    },
    {
      name: '24',
      children: [
        {
          name: '2',
        }
      ]
    }
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

const StyledTree = ({ rawTreeData }) => {
  const treeContainerEl = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeData, setTreeData] = useState({});
  
  useEffect(() => {
    const centerTree = () => {
      const dimensions = treeContainerEl.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 2
      });
    }

    centerTree()
  }, []);

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
        onUpdate={hidePathsToBlankNodes} // Toggling (aka expanding/collapsing) a node will cause react-d3-tree to fully re-create the new tree, which will include the paths to blank nodes. So we need to hide those paths again on these toggle updates.
      />
    </TreeContainer>
  )
};

StyledTree.propTypes = {
  rawTreeData: PropTypes.object,
};

StyledTree.defaultProps = {
  rawTreeData: treeDefaultData,
};

export default StyledTree;
