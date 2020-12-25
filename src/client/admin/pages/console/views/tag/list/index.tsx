import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Form, Table, Input, Button, Divider, message } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import ColorPicker from 'rc-color-picker';

import PageHeaderStyled from '@/client/admin/components/page-header';
import FormItemStyled from '@/client/admin/components/form-item';

import { TagListItem, QueryTagListData, TagCreatorItem } from '@/dto/tag/response';

import Http from '@/client/http';

import { tag } from '@/client/api';

type TagListState = {
  loading: boolean;
  tags: Array<TagListItem>;
  currentPage: number;
  totalPages: number;
  total: number;
};

const TagList: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const mounted = React.useRef<boolean>(false);

  const tableHeight = React.useRef<number>(document.body.clientHeight - 335);

  const [state, setState] = React.useState<TagListState>({
    loading: false,
    tags: [],
    totalPages: 1,
    currentPage: 1,
    total: 0,
  });

  const queryTags = React.useCallback(
    async (page?: number) => {
      setState(
        (state: TagListState): TagListState => {
          return {
            ...state,
            loading: true,
          };
        },
      );

      const res = await Http.get<QueryTagListData>(tag.list, {
        page: page ?? state.currentPage,
        pageSize: 10,
      });

      if (res.code === 1) {
        const data: QueryTagListData = res.data;

        setState(
          (state: TagListState): TagListState => {
            return {
              ...state,
              loading: false,
              tags: data.data,
              currentPage: data.currentPage,
              totalPages: data.totalPages,
              total: data.total,
            };
          },
        );
      }
    },
    [state],
  );

  const addTag = React.useCallback(() => {
    form.validateFields(['title', 'color']).then(
      async (value) => {
        const res = await Http.put(tag.create, value);

        if (res.code === 1) {
          Modal.destroyAll();

          message.destroy();
          message.success(res.message);

          queryTags(1);
        }
      },
      (err) => {
        const { errorFields } = err;
        message.destroy();
        message.error(errorFields[0].errors);
      },
    );
  }, [form, queryTags]);

  const updateTag = React.useCallback(
    (tagId: string) => {
      form.validateFields(['title', 'color']).then(
        async (value) => {
          value.id = tagId;
          const res = await Http.post(tag.update, value);

          if (res.code === 1) {
            Modal.destroyAll();

            message.destroy();
            message.success(res.message);

            queryTags(1);
          }
        },
        (err) => {
          const { errorFields } = err;
          message.destroy();
          message.error(errorFields[0].errors);
        },
      );
    },
    [form, queryTags],
  );

  const showAddModal = React.useCallback(() => {
    Modal.confirm({
      title: '新增标签',
      icon: null,
      centered: true,
      content: (
        <Form form={form}>
          <FormItemStyled
            name="title"
            label="标签名称"
            rules={[
              {
                required: true,
                message: '请输入标签名称!',
              },
            ]}
            initialValue={''}
          >
            <Input />
          </FormItemStyled>
          <FormItemStyled
            name="color"
            label="标签颜色"
            initialValue={'#000'}
            rules={[
              {
                required: true,
                message: '请选择标签颜色!',
              },
            ]}
          >
            <ColorPicker
              color={'#000'}
              placement="topLeft"
              onChange={({ color }) => {
                form.setFields([
                  {
                    name: 'color',
                    value: color,
                  },
                ]);
              }}
            >
              <span className="rc-color-picker-trigger" />
            </ColorPicker>
          </FormItemStyled>
        </Form>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk: addTag,
    });
  }, [form]);

  const showDeleteModal = React.useCallback(
    (row: TagListItem) => {
      Modal.confirm({
        title: '删除确认',
        content: '确定要删除此标签吗, 文章内的标签会被同步删除。',
        okText: '删除',
        cancelText: '取消',
        okType: 'danger',
        centered: true,
        onOk: async () => {
          const res = await Http.delete(tag.delete(row.id));

          if (res.code === 1) {
            message.destroy();
            message.success(res.message);
            queryTags(1);
          }
        },
      });
    },
    [queryTags],
  );

  const showUpdateModal = React.useCallback((row: TagListItem) => {
    Modal.confirm({
      title: '更新标签',
      icon: null,
      centered: true,
      content: (
        <Form form={form}>
          <FormItemStyled
            name="title"
            label="标签名称"
            initialValue={row.title}
            rules={[
              {
                required: true,
                message: '请输入标签名称!',
              },
            ]}
          >
            <Input />
          </FormItemStyled>
          <FormItemStyled
            name="color"
            label="标签颜色"
            initialValue={row.color}
            rules={[
              {
                required: true,
                message: '请选择标签颜色!',
              },
            ]}
          >
            <ColorPicker
              color={row.color}
              placement="topLeft"
              onChange={({ color }) => {
                form.setFields([
                  {
                    name: 'color',
                    value: color,
                  },
                ]);
              }}
            >
              <span className="rc-color-picker-trigger" />
            </ColorPicker>
          </FormItemStyled>
        </Form>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk: () => updateTag(row.id),
    });
  }, []);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      queryTags();
    }
  }, [mounted, queryTags]);

  const columns = React.useMemo<Array<ColumnType<TagListItem>>>(() => {
    return [
      {
        title: '标签名称',
        dataIndex: 'title',
        key: 'id',
      },
      {
        title: '颜色',
        dataIndex: 'color',
        key: 'id',
        render: (color: string) => <span style={{ color }}>{color}</span>,
      },
      {
        title: '创建人',
        key: 'id',
        dataIndex: 'creator',
        render: (creator: TagCreatorItem) => creator.userName,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'id',
      },
      {
        title: '操作',
        key: 'id',
        render: (text: string, row: TagListItem) => (
          <>
            <Button size="small" onClick={() => showUpdateModal(row)}>
              更新
            </Button>
            <Divider type="vertical" />
            <Button danger size="small" onClick={() => showDeleteModal(row)}>
              删除
            </Button>
          </>
        ),
      },
    ];
  }, []);

  const pagination = React.useMemo<TablePaginationConfig>(() => {
    return {
      total: state.total,
      current: state.currentPage,
      pageSize: 10,
      onChange: queryTags,
    };
  }, [state, queryTags]);

  return (
    <div>
      <PageHeaderStyled
        onBack={history.goBack}
        title="标签管理"
        extra={[
          <Button type="primary" onClick={showAddModal} key="add-tag">
            新增标签
          </Button>,
        ]}
      />
      <Table
        bordered={true}
        loading={state.loading}
        dataSource={state.tags}
        columns={columns}
        pagination={pagination}
        rowKey={(row: TagListItem) => row.id}
        scroll={{
          y: tableHeight.current,
        }}
      />
    </div>
  );
};

export default React.memo(TagList);
