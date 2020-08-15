import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {
  rawTreeData: {
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
    ],
  },
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  return { globalState, globalDispatch };
};

export default useGlobalState;
