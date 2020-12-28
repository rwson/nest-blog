import React from 'react';
import styled from '@emotion/styled';
import { Form } from 'antd';

const FormItem = styled<typeof Form.Item>(Form.Item)({
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
  '&.fixed-left': {
    '.ant-form-item-label': {
      padding: '0 0 0 9px'
    }
  }
});

const FormItemStyled = (props) => {
  return <FormItem {...props} />;
};

export default React.memo(FormItemStyled);
