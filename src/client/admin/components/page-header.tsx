import React from 'react';

import { PageHeader } from 'antd';

import styled from '@emotion/styled';

const Header = styled<any>(PageHeader)({
  border: '1px solid #f2f2f2',
  borderRadius: '3px',
});

const PageHeaderStyled = (props) => {
  return <Header {...props} />;
};

export default React.memo(PageHeaderStyled);
