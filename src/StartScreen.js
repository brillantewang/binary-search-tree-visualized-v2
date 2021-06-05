import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import Context from './store/context';
import { SET_ROOT_VALUE } from './store/useGlobalState';

const Root = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  font-size: 18px;
`;

const Copy = styled.div`
  margin-bottom: 5px;
`;

const Input = styled.input`
  outline: none;
  font-size: 18px;
`;

const Submit = styled.div`
  margin-top: 10px;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  ${({ sc }) => sc.isDisabled && css`
    border: 1px solid grey;
    color: grey;
    cursor: default;
  `}
`;

const StartScreen = () => {
  const [value, setValue] = useState('');
  const { globalState: { rawTreeData }, globalDispatch } = useContext(Context);

  if (rawTreeData) return null;

  const onValueChange = e => setValue(e.target.value);

  const onSubmit = () => {
    if (value) globalDispatch({ type: SET_ROOT_VALUE, payload: { value: value.toString() } });
  };

  return (
    <Root>
      <Copy>Add a root value</Copy>
      <Input
        // iPhone Safari was still allowing me to type non-numeric characters, so I added some
        // of these attributes. source: https://stackoverflow.com/a/47455885/14781986
        type="number"
        min="0"
        inputmode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={onValueChange}
      />
      <Submit sc={{ isDisabled: !value }} onClick={onSubmit}>Add</Submit>
    </Root>
  );
};

export default StartScreen;
