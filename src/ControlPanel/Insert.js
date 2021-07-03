import cloneDeep from 'clone-deep';
import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import MobileFriendlyInput from '../MobileFriendlyInput';
import { findNode, insertNode } from '../ResponsiveTree/util';
import Context from '../store/context';
import { insert, replaceTree } from '../store/useGlobalState';

const Root = styled.div`
  color: white;
  font-size: 18px;
`;

const InputContainer = styled.div`
  display: flex;
`;

const Submit = styled.button`
  margin-left: 8px;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  ${({ sc }) => sc.isSubmitDisabled && css`
    border: 1px solid grey;
    color: grey;
    cursor: default;
  `}
`;

const Error = styled.div`
  font-size: 14px;
  margin-top: 4px;
`;

const Insert = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { globalState: { rawTreeData }, globalDispatch } = useContext(Context);

  const onValueChange = e => {
    setValue(e.target.value.slice(0, 8));
    if (e.target.value.length > 7) {
      setError('chill.. too many characters (7 max)');
    } else {
      setError('');
    }
  };

  const onSubmit = () => {
    if (findNode(rawTreeData, value)) {
      setError(`${value} is already in the tree. insert a different value mang`);
    } else {
      const rawTreeDataDeepCloned = cloneDeep(rawTreeData);
      const nodeToInsert = { name: value.toString(), children: [] };
      insertNode(rawTreeDataDeepCloned, nodeToInsert);
      globalDispatch(replaceTree(rawTreeDataDeepCloned));
      setError('');
    }

    setValue('');
  }

  const isSubmitDisabled = !value || error;

  return (
    <Root>
      <InputContainer>
        <MobileFriendlyInput value={value} onChange={onValueChange} />
        <Submit
          sc={{ isSubmitDisabled }}
          onClick={onSubmit}
          disabled={isSubmitDisabled}
        >
          Insert
        </Submit>
      </InputContainer>
      <Error>{error}</Error>
    </Root>
  );
};

export default Insert;
