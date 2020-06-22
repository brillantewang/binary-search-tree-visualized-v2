import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { breakpoints } from '../breakpoints';
import cloneDeep from 'clone-deep';
import { insertBlankNodesRecursively } from './util';

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

const ResponsiveTree = ({ rawTreeData }) => {
  const [treeData, setTreeData] = useState({});

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
  }, [rawTreeData]);

  // https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
  return window.innerWidth < breakpoints.tablet ? <Mobile treeData={treeData} /> : <Desktop treeData={treeData} />;
}

export default ResponsiveTree;

ResponsiveTree.propTypes = {
  rawTreeData: PropTypes.object,
};

ResponsiveTree.defaultProps = {
  rawTreeData: treeDefaultData,
};
