import { useReducer } from 'react';
import { emptyRootNode, testRootNode } from '../constants'; // eslint-disable-line no-unused-vars

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
  rawTreeData: emptyRootNode, // replace with testRootNode if you want to populate tree with test data
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  return { globalState, globalDispatch };
};

export default useGlobalState;
