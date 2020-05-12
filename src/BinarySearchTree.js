import React from 'react';
import Tree from 'react-d3-tree';

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
  return <Tree data={TreeData} />
};

export default BinarySearchTree;
