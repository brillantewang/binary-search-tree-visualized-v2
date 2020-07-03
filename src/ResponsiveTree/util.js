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

const getPathsToBlankNodes = () => {
  const blankCircles = document.querySelectorAll('circle[r="0"]');
  const blankNodeIds = [...blankCircles].map(circle => circle.parentNode.id);
  return blankNodeIds.map(id => document.querySelector(`path[data-target-id="${id}"`))
};

export const hidePathsToBlankNodes = () => {
  const pathsToBlankNodes = getPathsToBlankNodes();
  pathsToBlankNodes.forEach(path => path.style.strokeWidth = "0");
};

export const getRootNodeDimensions = () => {
  const treeGElement = document.querySelector('.nodeBase');
  return treeGElement.getBoundingClientRect();
};

export const getTreeDimensions = () => {
  const treeGElement = document.querySelector('g');
  return treeGElement.getBoundingClientRect();
};

export const getTreeContainerPadding = () => {
  return ({ vertical: 400, horizontal: 40 });
};
