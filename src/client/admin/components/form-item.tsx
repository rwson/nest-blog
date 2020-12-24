import React from 'react';
import styled from '@emotion/styled';
import { Form } from 'antd';

const FormItem = styled<any>(Form.Item)({
  '&.ant-form-item-has-error': {
    '.ant-input': {
      border: '1px solid #d9d9d9',
    },
    '.ant-form-item-explain-error': {
      '[role="alert"]': {
        display: 'none',
      },
    },
  },
});

const FormItemStyled = (props) => {
  return <FormItem {...props} />;
};

export default React.memo(FormItemStyled);
