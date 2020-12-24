import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Form, Table, Input, Button, Divider, message } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import PageHeaderStyled from '@/client/admin/components/page-header';
import FormItemStyled from '@/client/admin/components/form-item';

import { CategoryListItem, QueryCategoryListData } from '@/dto/category/response';

import Http from '@/client/http';

import { category } from '@/client/api';

type CategoryListState = {
  loading: boolean;
  categories: Array<CategoryListItem>;
  currentPage: number;
  totalPages: number;
  total: number;
};

const CategoryList: React.FC = () => {
  const history = useHistory();

  const [form] = Form.useForm();

  const mounted = React.useRef<boolean>(false);

  const tableHeight = React.useRef<number>(document.body.clientHeight - 335);

  const [state, setState] = React.useState<CategoryListState>({
    loading: false,
    categories: [],
    totalPages: 1,
    currentPage: 1,
    total: 0,
  });

  const queryCategories = React.useCallback(async (page?: number) => {
    setState(
      (state: CategoryListState): CategoryListState => {
        return {
          ...state,
          loading: true,
        };
      }
    );

    const res = await Http.get<QueryCategoryListData>(category.list, {
      page: page ?? state.currentPage,
      pageSize: 10
    });

    if (res.code === 1) {
      const data: QueryCategoryListData = res.data;

      setState((state: CategoryListState): CategoryListState => {
        return {
          ...state,
          categories: data.data,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          total: data.total,
          loading: false
        };
      });
    }
  }, [state]);


  const addCategory = React.useCallback(() => {
    form.validateFields(['title']).then(
      async (value) => {
        const res = await Http.put(category.create, value);

        if (res.code === 1) {
          Modal.destroyAll();

          message.destroy();
          message.success(res.message);

          queryCategories(1);
        }
      },
      (err) => {
        const { errorFields } = err;
        message.destroy();
        message.error(errorFields[0].errors);
      },
    );
  }, [form, queryCategories]);

  const showAddModal = React.useCallback(() => {
    Modal.confirm({
      title: '新增分类',
      icon: null,
      centered: true,
      content: (
        <Form form={form}>
          <FormItemStyled
            name="title"
            label="分类名称"
            rules={[
              {
                required: true,
                message: '请输入分类名称!',
              },
            ]}
            initialValue={""}
          >
            <Input />
          </FormItemStyled>
        </Form>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk: addCategory
    });
  }, [form]);

  const showDeleteModal = React.useCallback(
    (row: CategoryListItem) => {
      Modal.confirm({
        title: '删除确认',
        content: '确定要删除此分类吗, 文章内的分类会被同步删除。',
        okText: '删除',
        cancelText: '取消',
        okType: 'danger',
        centered: true,
        onOk: async () => {
          const res = await Http.delete(tag.delete(row.id));

          if (res.code === 1) {
            message.destroy();
            message.success(res.message);
            queryCategories(1);
          }
        },
      });
    },
    [queryCategories],
  );

  // const showUpdateModal = React.useCallback((row: TagListItem) => {
  //   Modal.confirm({
  //     title: '更新标签',
  //     icon: null,
  //     centered: true,
  //     content: (
  //       <Form form={form}>
  //         <FormItemStyled
  //           name="title"
  //           label="标签名称"
  //           initialValue={row.title}
  //           rules={[
  //             {
  //               required: true,
  //               message: '请输入标签名称!',
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </FormItemStyled>
  //         <FormItemStyled
  //           name="color"
  //           label="标签颜色"
  //           initialValue={row.color}
  //           rules={[
  //             {
  //               required: true,
  //               message: '请选择标签颜色!',
  //             },
  //           ]}
  //         >
  //           <ColorPicker
  //             color={row.color}
  //             placement="topLeft"
  //             onChange={({ color }) => {
  //               form.setFields([
  //                 {
  //                   name: 'color',
  //                   value: color,
  //                 },
  //               ]);
  //             }}
  //           >
  //             <span className="rc-color-picker-trigger" />
  //           </ColorPicker>
  //         </FormItemStyled>
  //       </Form>
  //     ),
  //     okText: '确定',
  //     cancelText: '取消',
  //     onOk: () => updateTag(row.id),
  //   });
  // }, []);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      queryCategories();
    }
  }, [mounted, queryCategories]);

  const columns = React.useMemo<Array<ColumnType<CategoryListItem>>>(() => {
    return [
      {
        title: '分类名称',
        dataIndex: 'title',
        key: 'id',
      },
      {
        title: '创建人',
        key: 'id',
        render: (text: string, row: CategoryListItem) => row.creator.userName,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'id',
      },
      {
        title: '操作',
        key: 'id',
        render: (text: string, row: CategoryListItem) => (
          <>
            <Button size="small">
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
      onChange: queryCategories,
    };
  }, [state, queryCategories]);

  return (
    <div>
      <PageHeaderStyled 
        onBack={history.goBack}
        title="分类列表"
        extra={[
          <Button type="primary" onClick={showAddModal} key="add-tag">
            新增分类
          </Button>
        ]} />
      <Table
        bordered={true}
        loading={state.loading}
        dataSource={state.categories}
        columns={columns}
        pagination={pagination}
        rowKey={(row: CategoryListItem) => row.id}
        scroll={{
          y: tableHeight.current,
        }}
      />
    </div>
  );
};

export default React.memo(CategoryList);
