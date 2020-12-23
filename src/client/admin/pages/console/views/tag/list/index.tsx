import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Form, Table, Input, Button, message } from 'antd';

import PageHeaderStyled from '@/client/admin/components/page-header';

import { TagListContainer } from './style';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const TagList: React.FC = () => {
  const history = useHistory();
  const [ form ] = Form.useForm();

  const showAddModal = React.useCallback(() => {
    Modal.confirm({
      title: '新增标签',
      className: 'tag-list-modal',
      content: (
        <Form form={form}>
          <Form.Item name="标签名称" label="Note" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      )
    });
  }, [form]);

  return (
    <TagListContainer>
      <PageHeaderStyled
        onBack={history.goBack}
        title="标签管理"
        extra={[
          <Button type="primary" onClick={showAddModal}>新增标签</Button>
        ]}
      />
      <Table bordered={true} dataSource={dataSource} columns={columns} />
    </TagListContainer>
  );
};

export default React.memo(TagList);
