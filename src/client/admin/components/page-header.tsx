import React from 'react';
import styled from '@emotion/styled';
import { PageHeader } from 'antd';

const Header = styled<any>(PageHeader)({
  border: '1px solid #f2f2f2',
  borderRadius: '3px',
  padding: '10px 15px',
  margin: '0 0 15px',
  '.ant-page-header-heading-title': {
    fontWeight: 'normal',
    fontSize: '16px',
  },
});

const PageHeaderStyled = (props) => {
  return <Header {...props} />;
};

export default React.memo(PageHeaderStyled);
