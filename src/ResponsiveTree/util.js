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
  if (parseInt(childNode.name) < parseInt(node.name)) {
    node.children.push(blankNode);
  } else {
    node.children.unshift(blankNode);
  }
};

export const insertBlankNodesRecursively = node => {
  const children = node.children || [];
  children.forEach(child => insertBlankNodesRecursively(child));
  if (children.length === 1) insertBlankChildNode(node);
};

export const getRootNodeDimensions = () => {
  const treeGElement = document.querySelector('.nodeBase');
  return treeGElement.getBoundingClientRect();
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
