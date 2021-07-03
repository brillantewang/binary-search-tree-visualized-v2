const buildBlankNode = () => ({
  name: '',
  nodeSvgShape: {
    shape: 'circle',
    shapeProps: {
      r: 0,
    }
  }
});

const insertBlankChildNode = (node) => {
  const childNode = node.children[0];
  const blankNode = buildBlankNode();
  if (parseFloat(childNode.name) < parseFloat(node.name)) {
    node.children.push(blankNode);
  } else {
    node.children.unshift(blankNode);
  }
};

export const findNode = (node, valueToFind) => {
  const currentNodeValue = parseFloat(node.name);
  const leftNode = node.children.find(child => parseFloat(child.name) < currentNodeValue);
  const rightNode = node.children.find(child => parseFloat(child.name) > currentNodeValue);

  if (isTreeEmpty(node)) {
    return;
  } else if (valueToFind < currentNodeValue) {
    if (leftNode === undefined) {
      return
    } else {
      return findNode(leftNode, valueToFind);
    }
  } else if (valueToFind > currentNodeValue) {
    if (rightNode === undefined) {
      return;
    } else {
      return findNode(rightNode, valueToFind);
    }
  } else {
    return currentNodeValue;
  }
};

export const insertNode = (node, nodeToInsert) => {
  const currentNodeValue = parseFloat(node.name);
  const valueToAdd = parseFloat(nodeToInsert.name);
  const leftNode = node.children.find(child => parseFloat(child.name) < currentNodeValue);
  const rightNode = node.children.find(child => parseFloat(child.name) > currentNodeValue);

  if (isTreeEmpty(node)) {
    Object.assign(node, nodeToInsert);
  } else if (valueToAdd < currentNodeValue) {
    if (leftNode === undefined) {
      node.children.unshift(nodeToInsert);
    } else {
      insertNode(leftNode, nodeToInsert);
    }
  } else if (valueToAdd > currentNodeValue) {
    if (rightNode === undefined) {
      node.children.push(nodeToInsert);
    } else {
      insertNode(rightNode, nodeToInsert);
    }
  } else {
    console.log('Duplicate values not allowed');
  }
};


export const insertBlankNodesRecursively = node => {
  const children = node.children || [];
  children.forEach(child => insertBlankNodesRecursively(child));
  if (children.length === 1) insertBlankChildNode(node);
};

export const getRootNodeDimensions = () => {
  // Looks like react-d3-tree only gives the .nodeBase class name to nodes that have children.
  // It gives nodes with no children the class name .leafNodeBase. So in the case that
  // there's only one node in the entire tree, it has the class name .leafNodeBase, so we need
  // to select with that class name instead, and treat it as the node base.
  const nodeBase = document.querySelector('.nodeBase') || document.querySelector('.leafNodeBase');
  return nodeBase.getBoundingClientRect();
};

export const getTreeDimensions = () => {
  const treeGElement = document.querySelector('g');
  return treeGElement.getBoundingClientRect();
};

// adapted/simplified from https://www.educative.io/edpresso/how-to-use-the-debounce-function-in-javascript
export const debounce = (callback, wait) => {
  let timeout;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(), wait);
  }
};

export const isTreeEmpty = node => node.name === null;
