import React from 'react';
import styled from '@emotion/styled';
import { Spin } from 'antd';

const Wrap = styled.div({
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const LoadingSpin: React.FC = () => {
  return (
    <Wrap>
      <Spin size="large" />
    </Wrap>
  );
};

export default React.memo(LoadingSpin);
