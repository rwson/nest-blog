import React from 'react';

import { useHistory } from 'react-router-dom';

import { Modal, Table, Button, Divider, Form, Input, Select } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import MDEditor, { commands, ICommand, TextState, TextApi } from '@uiw/react-md-editor';

import PageHeaderStyled from '@/client/admin/components/page-header';
import FormItemStyled from '@/client/admin/components/form-item';
import RichImage from '@/client/admin/components/rich-img';
import TagStyled from '@/client/components/tag';
import MarkDownRender from '@/client/components/markdown-render';

import { TagListItem } from '@/dto/tag/response';
import { CategoryListItem } from '@/dto/category/response';
import { FileItem } from '@/dto/file/response';

import Http from '@/client/http';

import { article, category, tag, file } from '@/client/api';

import { PageContainer, StyledMDEditor, ImagesContainer } from './style';

type TagsMapType = {
  [key: string]: TagListItem;
};

type PublishArticleState = {
  tags: Array<TagListItem>;
  categories: Array<CategoryListItem>;
  images: Array<FileItem>;
};

const PublishArticle: React.FC = () => {
  const history = useHistory();

  const mounted = React.useRef<boolean>(false);

  const [ state, setState ] = React.useState<PublishArticleState>({
    tags: [],
    categories: [],
    images: []
  });

  const [ form ] = Form.useForm();
  
  const tagsMap = React.useMemo<TagsMapType>(() => {
    const res = {};

    state.tags.forEach((tag: TagListItem) => {
      res[tag.id] = tag;
    });

    return res;
  }, [state.tags]);

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

  const getImageFiles = React.useCallback(async() => {
    const res = await Http.get<Array<FileItem>>(file.library);
    
    if (res.code === 1) {
      setState((state: PublishArticleState): PublishArticleState => {
        return {
          ...state,
          images: res.data.filter((file: FileItem): boolean => file.type.startsWith('image'))
        };
      });
    }
  }, []);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      queryTags();
      queryCategories();
      getImageFiles();
    }
  }, [mounted, queryTags, queryCategories, getImageFiles]);

  const imageCommand = React.useMemo<ICommand>(() => {
    return {
      name: 'image',
      keyCommand: 'image',
      buttonProps: { 'aria-label': 'Insert image' },
      icon: (
        <svg width="12" height="12" viewBox="0 0 20 20"><path fill="currentColor" d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"></path></svg>
      ),
      execute: (textState: TextState, textApi: TextApi) => {
        Modal.confirm({
          title: '选择图片',
          icon: null,
          centered: true,
          content: (
            <ImagesContainer>
              {
                state.images.map((img: FileItem) => {
                  return (
                    <RichImage key={img.id} fileId={img.id} src={file.detail(img.id)} />
                  );
                })
              }
            </ImagesContainer>
          )
        });
      }
    }
  }, [getImageFiles, state]);

  const editorCommands = React.useMemo<Array<ICommand>>(() => {
    return [
      commands.bold,
      commands.italic,
      commands.strikethrough,
      commands.title,
      commands.divider,
      commands.link,
      commands.link,
      commands.quote,
      commands.code,
      imageCommand,
      commands.divider,
      commands.unorderedListCommand,
      commands.orderedListCommand,
      commands.checkedListCommand,
      commands.divider,
      commands.codeEdit,
      commands.codeLive,
      commands.codePreview,
      commands.divider,
      commands.fullscreen
    ];
  }, [imageCommand]);

  return (
    <PageContainer>
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
          initialValue={undefined}
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
          name="tags"
          label="文章标签"
          className="fixed-left"
          initialValue={[]}
        >
          <Select
            placeholder="请选择文章标签"
            mode="multiple"
            showArrow={true}
            allowClear={true}
            tagRender={(tag: any) => {
              const currentTag: TagListItem = tagsMap[tag.value];
              return (
                <TagStyled
                  closable={true}
                  color={currentTag.color}
                  onClose={() => {
                    const tags: Array<string> = form.getFieldValue('tags');
                    form.setFields([
                      {
                        name: 'tags',
                        value: tags.filter((tag: string) => tag !== currentTag.id)
                      }
                    ]);
                  }}
                >{currentTag.title}</TagStyled>
              );
            }}
            onChange={(value: Array<string>) => {
              form.setFields([
                {
                  name: 'tags',
                  value
                }
              ]);
            }}
          >
            {
              state.tags.map((tag: TagListItem) => {
                return (
                  <Select.Option key={tag.id} value={tag.id}>{tag.title}</Select.Option>
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
            commands={editorCommands}
          />
        </FormItemStyled>
      </Form>
    </PageContainer>
  );
};

export default React.memo(PublishArticle);
