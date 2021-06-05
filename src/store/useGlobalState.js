import { useReducer } from 'react';

export const SET_ROOT_VALUE = 'SET_ROOT_VALUE';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ROOT_VALUE:
      return { rawTreeData: { name: action.payload.value } };
    default:
      return state;
  }
};

const initialState = {
  // comment in rawTreeData to populate default test nodes
  // rawTreeData: {
  //   name: '12',
  //   children: [
  //     {
  //       name: '8',
  //       children: [
  //         {
  //           name: '15',
  //           children: [
  //             {
  //               name: '3',
  //             },
  //           ]
  //         },
  //         {
  //           name: '19',
  //           children: [
  //             {
  //               name: '11',
  //             },
  //             {
  //               name: '55',
  //               children: [
  //                 {
  //                   name: '14',
  //                   children: [
  //                     {
  //                       name: '444',
  //                     }
  //                   ]
  //                 }
  //               ]
  //             },
  //           ]
  //         },
  //       ]
  //     },
  //     {
  //       name: '24',
  //       children: [
  //         {
  //           name: '2',
  //         }
  //       ]
  //     }
  //   ],
  // },
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  return { globalState, globalDispatch };
};

export default useGlobalState;
