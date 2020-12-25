import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Form, Table, Input, Button, Divider, message } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import PageHeaderStyled from '@/client/admin/components/page-header';

const ArticleRubbishList: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <PageHeaderStyled
        onBack={history.goBack}
        title="文章垃圾箱"
        extra={[
          <Button type="primary" key="add-article">
            发布文章
          </Button>,
        ]}
      />
    </div>
  );
};

export default React.memo(ArticleRubbishList);
