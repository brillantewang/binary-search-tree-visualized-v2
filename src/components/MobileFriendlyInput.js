import React from 'react';
import styled from 'styled-components/macro';

const Input = styled.input`
  outline: none;
  font-size: 18px;
  width: 100px;
`;

const MobileFriendlyInput = ({ onChange, value }) => (
  <Input
    // iPhone Safari was still allowing me to type non-numeric characters, so I added some
    // of these attributes. source: https://stackoverflow.com/a/47455885/14781986
    type="number"
    min="0"
    inputmode="numeric"
    pattern="[0-9]*"
    value={value}
    onChange={onChange}
  />
);

export default MobileFriendlyInput;
