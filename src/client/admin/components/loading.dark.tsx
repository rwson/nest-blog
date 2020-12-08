import React from 'react';
import styled from '@emotion/styled';
import { Spin } from 'antd';

const Wrap = styled.div({
  position: 'fixed',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0
});

const LoadingSpin: React.FC = () => {
  return (
    <Wrap>
      <Spin size="large" />
    </Wrap>
  );
};

export default React.memo(LoadingSpin);
