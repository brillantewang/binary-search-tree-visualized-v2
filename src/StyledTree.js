import React from 'react';
import Tree from 'react-d3-tree';
import PropTypes from 'prop-types';

const nodeStyle = {
  circle: {
    stroke: 'white',
    fill: '#162447',
  },
  name: {
    stroke: 'white',
    fill: 'white',
  },
};

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

const StyledTree = ({ data, translate, zoomable, onUpdate }) => {
  return (
    <Tree
      orientation='vertical'
      pathFunc='straight'
      styles={styles}
      nodeSvgShape={nodeSvgShape}
      textLayout={textLayout}
      data={data}
      translate={translate}
      zoomable={zoomable}
      onUpdate={onUpdate}
    />
  )
};

StyledTree.propTypes = {
  data: PropTypes.object,
  translate: PropTypes.object,
  zoomable: PropTypes.bool,
  onUpdate: PropTypes.func,
};

StyledTree.defaultProps = {
  zoomable: true,
};

export default StyledTree;