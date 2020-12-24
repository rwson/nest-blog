import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Form, Table, Input, Button, Divider, message } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import PageHeaderStyled from '@/client/admin/components/page-header';
import FormItemStyled from '@/client/admin/components/form-item';

import Http from '@/client/http';

import { tag } from '@/client/api';

const CommentList: React.FC = () => {
  const history = useHistory();

  return <div>CommentList</div>;
};

export default React.memo(CommentList);
