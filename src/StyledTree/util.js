const buildBlankNode = () => ({
  name: '',
  nodeSvgShape: {
    shape: 'circle',
    shapeProps: {
      r: 0,
    }
  }
})

const insertBlankChildNode = (node) => {
  const childNode = node.children[0];
  const blankNode = buildBlankNode();
  if (parseInt(childNode.name) < parseInt(node.name)) {
    node.children.push(blankNode);
  } else {
    node.children.unshift(blankNode);
  }
}

export const insertBlankChildrenNodesRecursively = node => {
  const children = node.children || [];
  children.forEach(child => insertBlankChildrenNodesRecursively(child));
  if (children.length === 1) insertBlankChildNode(node);
}

const getPathsToBlankNodes = () => {
  const blankCircles = document.querySelectorAll('circle[r="0"]');
  const blankNodeIds = [...blankCircles].map(circle => circle.parentNode.id);
  return blankNodeIds.map(id => document.querySelector(`path[data-target-id="${id}"`))
};

export const hidePathsToBlankNodes = () => {
  const pathsToBlankNodes = getPathsToBlankNodes();
  pathsToBlankNodes.forEach(path => path.style.strokeWidth = "0");
};
