import { useReducer } from 'react';

export const REPLACE_TREE = 'REPLACE_TREE';

export const replaceTree = value => ({
  type: REPLACE_TREE,
  payload: { value }
})

const reducer = (state, action) => {
  switch (action.type) {
    case REPLACE_TREE: {
      return { rawTreeData: action.payload.value };
    }
    default:
      return state;
  }
};

const initialState = {
  rawTreeData: {
    name: null,
    children: [],
  },
};

// comment in to populate default test nodes
// const initialState = {
//   rawTreeData: {
//     name: '12',
//     children: [
//       {
//         name: '8',
//         children: [
//           {
//             name: '15',
//             children: [
//               {
//                 name: '3',
//                 children: [],
//               },
//             ]
//           },
//           {
//             name: '19',
//             children: [
//               {
//                 name: '11',
//                 children: [],
//               },
//               {
//                 name: '55',
//                 children: [
//                   {
//                     name: '14',
//                     children: [
//                       {
//                         name: '444',
//                         children: [],
//                       }
//                     ]
//                   }
//                 ]
//               },
//             ]
//           },
//         ]
//       },
//       {
//         name: '24',
//         children: [
//           {
//             name: '2',
//             children: [],
//           }
//         ]
//       }
//     ],
//   },
// };

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  return { globalState, globalDispatch };
};

export default useGlobalState;
