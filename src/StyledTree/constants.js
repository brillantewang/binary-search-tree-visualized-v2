export const treeDefaultData = {
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

export const styles = {
  links: {
    stroke: 'white',
  },
  nodes: {
    node: nodeStyle,
    leafNode: nodeStyle,
  }
};

export const nodeSvgShape = {
  shape: 'circle',
  shapeProps: {
    r: 40,
  },
};

export const textLayout = {
  textAnchor: 'middle',
  x: 0,
  y: 0
};
