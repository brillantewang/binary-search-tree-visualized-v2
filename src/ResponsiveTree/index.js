import React, { useState, useEffect, useContext } from 'react';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { breakpoints } from '../breakpoints';
import cloneDeep from 'clone-deep';
import { insertBlankNodesRecursively } from './util';
import Context from '../store/context';

const ResponsiveTree = () => {
  const { globalState: { rawTreeData }} = useContext(Context);
  const [treeData, setTreeData] = useState({});

  useEffect(() => {
    if (rawTreeData) {
      const insertBlankPlaceholderNodes = () => {
        // We insert blank nodes in the tree to act as sibling placeholders.
        // That allows single child nodes to be offset from their parents instead of
        // positioned directly below (the default behavior for react-d3-tree).
        const newTreeData = cloneDeep(rawTreeData);
        insertBlankNodesRecursively(newTreeData);
        setTreeData(newTreeData);
      }

      insertBlankPlaceholderNodes();
    }
  }, [rawTreeData]);

  if (!rawTreeData) return null;

  // https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
  return window.innerWidth < breakpoints.tablet ? <Mobile treeData={treeData} /> : <Desktop treeData={treeData} />;
}

export default ResponsiveTree;
