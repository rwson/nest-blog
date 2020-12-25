import React from 'react';

import { useHistory } from 'react-router-dom';

import MDEditor from '@uiw/react-md-editor';

import { Modal, Table, Button, Divider, Form, Input, Select } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import PageHeaderStyled from '@/client/admin/components/page-header';
import FormItemStyled from '@/client/admin/components/form-item';

import MarkDownRender from '@/client/components/markdown-render';

import { TagListItem } from '@/dto/tag/response';

import { CategoryListItem } from '@/dto/category/response';

import Http from '@/client/http';

import { article, category, tag } from '@/client/api';

import { StyledMDEditor } from './style';

type PublishArticleState = {
  tags: Array<TagListItem>;
  categories: Array<CategoryListItem>;
};

const PublishArticle: React.FC = () => {
  const history = useHistory();

  const mounted = React.useRef<boolean>(false);

  const [ state, setState ] = React.useState<PublishArticleState>({
    tags: [],
    categories: []
  });

  const [ form ] = Form.useForm();

  const queryTags = React.useCallback(async() => {
    const res = await Http.get<Array<TagListItem>>(tag.listAll);

    if (res.code === 1) {
      setState((state: PublishArticleState): PublishArticleState => {
        return {
          ...state,
          tags: res.data
        };
      });
    }
  }, []);

  const queryCategories = React.useCallback(async() => {
    const res = await Http.get<Array<CategoryListItem>>(category.listAll);

    if (res.code === 1) {
      setState((state: PublishArticleState): PublishArticleState => {
        return {
          ...state,
          categories: res.data
        };
      });
    }
  }, []);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      queryTags();
      queryCategories();
    }
  }, [mounted, queryTags, queryCategories]);

  return (
    <div>
      <PageHeaderStyled
        onBack={history.goBack}
        title="发布文章"
      />
      <Form form={form}>
        <FormItemStyled
          name="title"
          label="文章标题"
          rules={[
            {
              required: true,
              message: '请输入文章标题!',
            },
          ]}
          initialValue={''}
        >
          <Input placeholder="请输入文章标题" />
        </FormItemStyled>
        <FormItemStyled
          name="category"
          label="文章分类"
          className="fixed-left"
          initialValue={''}
        >
          <Select
            placeholder="请选择文章分类"
            defaultValue={undefined}
            allowClear={true}
          >
            {
              state.categories.map((category: CategoryListItem) => {
                return (
                  <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
                );
              })
            }
          </Select>
        </FormItemStyled>
        <FormItemStyled
          name="content"
          label="文章内容"
          rules={[
            {
              required: true,
              message: '请输入文章标题!',
            },
          ]}
          initialValue={''}
        >
          <StyledMDEditor
            height={500}
            onChange={(value: string) => form.setFields([
              {
                name: 'content',
                value
              }
            ])}
            visiableDragbar={false}
            previewOptions={{
              renderers: {
                ...MarkDownRender
              }
            }}
          />
        </FormItemStyled>
      </Form>
    </div>
  );
};

export default React.memo(PublishArticle);
