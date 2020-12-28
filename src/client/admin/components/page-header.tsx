import React from 'react';
import styled from '@emotion/styled';
import { PageHeader } from 'antd';

const Header = styled<typeof PageHeader>(PageHeader)({
  border: '1px solid #f2f2f2!important',
  borderRadius: '3px!important',
  padding: '10px 15px!important',
  margin: '0 0 15px 0!important',
  '.ant-page-header-heading-title': {
    fontWeight: 'normal',
    fontSize: '16px',
  },
});

const PageHeaderStyled = (props) => {
  return <Header {...props} />;
};

export default React.memo(PageHeaderStyled);
