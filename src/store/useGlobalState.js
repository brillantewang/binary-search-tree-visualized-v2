import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  return { globalState, globalDispatch };
};

export default useGlobalState;
