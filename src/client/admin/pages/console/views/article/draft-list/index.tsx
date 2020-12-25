import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Form, Table, Input, Button, Divider, message } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import PageHeaderStyled from '@/client/admin/components/page-header';

import {
  ArticleDetailData
} from '@/dto/article/response';

import Http from '@/client/http';

import { category } from '@/client/api';

const ArticleDraftList: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <PageHeaderStyled
        onBack={history.goBack}
        title="文章草稿箱"
        extra={[
          <Button type="primary" key="add-article">
            发布文章
          </Button>,
        ]}
      />
      <Table />
    </div>
  );
};

export default React.memo(ArticleDraftList);
