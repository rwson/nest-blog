import React from 'react';

import { useHistory, useParams } from 'react-router-dom';

import * as moment from 'moment';

import { Modal, Table, Button, Divider, Form, Input, Select, Checkbox, DatePicker, message } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import { commands, ICommand, TextState, TextApi } from '@uiw/react-md-editor';

import PageHeaderStyled from '@/client/admin/components/page-header';
import FormItemStyled from '@/client/admin/components/form-item';
import RichImage from '@/client/admin/components/rich-img';
import UploadButton from '@/client/admin/components/upload';
import TagStyled from '@/client/components/tag';
import MarkDownRender from '@/client/components/markdown-render';

import { TagListItem } from '@/dto/tag/response';
import { CategoryListItem } from '@/dto/category/response';
import { FileItem } from '@/dto/file/response';
import { ArticleDetailData, ArticleDetailTag, ArticleDetailCategory } from '@/dto/article/response';

import Http from '@/client/http';

import { article, category, tag, file } from '@/client/api';

import { PageContainer, StyledMDEditor, ImagesContainer, CheckBoxContainer, ButtonContainer } from './style';

type TagsMapType = {
  [key: string]: TagListItem;
};

type UpdateArticleState = {
  tags: Array<TagListItem>;
  categories: Array<CategoryListItem>;
  images: Array<FileItem>;
  showModal: boolean;
};

type ArticleDetailState = {
  id: string;
  tags: Array<string>;
  category: string;
  publishDate: moment.Moment;
  isDraft: boolean;
  title: string;
  source: string;
};

type UpdateArticleEditState = {
  textState: TextState | null;
  textApi: TextApi | null;
};

type PageParams = {
  id: string;
};

const UpdateArticle: React.FC = () => {
  const history = useHistory();

  const params = useParams<PageParams>();

  const now = React.useRef<moment.Moment>(moment());

  const mounted = React.useRef<boolean>(false);

  const [ state, setState ] = React.useState<UpdateArticleState>({
    tags: [],
    categories: [],
    images: [],
    showModal: false
  });

  const [ articleState, setArticleState ] = React.useState<ArticleDetailState>({
    isDraft: false,
    category: '',
    tags: [],
    source: '',
    publishDate: moment(),
    title: '',
    id: ''
  });

  const [ editorState, setEditorState ] = React.useState<UpdateArticleEditState>({
    textState: null,
    textApi: null
  });

  const [ isDraft, setIsDraft ] = React.useState<boolean>(false);

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
      setState((state: UpdateArticleState): UpdateArticleState => {
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
      setState((state: UpdateArticleState): UpdateArticleState => {
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
      setState((state: UpdateArticleState): UpdateArticleState => {
        return {
          ...state,
          images: res.data.filter((file: FileItem): boolean => file.type.startsWith('image'))
        };
      });
    }
  }, []);

  const getContentDetail = React.useCallback(async() => {
    const res = await Http.get<ArticleDetailData>(article.detail(params.id));

    if (res.code === 1) {
      const data = res.data;

      setIsDraft(() => data.isDraft);

      setArticleState((state: ArticleDetailState): ArticleDetailState => {
        return {
          ...state,
          id: data.id,
          title: data.title,
          isDraft: data.isDraft,
          publishDate: moment(data.publishDate),
          category: data.category.id,
          tags: data.tags.map((tag: ArticleDetailTag) => tag.id),
          source: data.source
        };
      });

      form.resetFields();
    }
  }, [params, form]);

  const initData = React.useCallback(async () => {
    await Promise.all([
      queryTags(),
      queryCategories(),
      getImageFiles()
    ]);
    getContentDetail();
  }, [queryTags, queryCategories, getImageFiles, getContentDetail]);

  const uploadImage = React.useCallback(async(changed: File | null) => {
    if (changed) {
      const res = await Http.upload(file.upload, {
        file: changed
      });

      if (res.code === 1) {
        message.success('上传成功!');
        getImageFiles();
      }
    }
  }, [getImageFiles]);

  const cancelSelect = React.useCallback(() => {
    setEditorState((state: UpdateArticleEditState): UpdateArticleEditState => {
      return {
        ...state,
        textState: null,
        textApi: null
      };
    });

    setState((state: UpdateArticleState): UpdateArticleState => {
      return {
        ...state,
        showModal: false
      };
    });
  }, []);

  const insertImage = React.useCallback((fileId: string) => {
    const { textApi, textState } = editorState;
    const src: string = file.detail(fileId);
    const imgStr: string = `![](${src})`;

    textApi.replaceSelection(imgStr);

    cancelSelect();
  }, [editorState, cancelSelect]);

  const UpdateArticle = React.useCallback(() => {
    form.validateFields(['title', 'source', 'tags', 'category', 'publishDate'])
      .then(async (values) => {
        values.isDraft = isDraft;
        values.publishDate = values.publishDate.format('YYYY-MM-DD');
        values.tags = values.tags.join('-');
        values.id = params.id;

        const res = await Http.post(article.update, values);

        if (res.code === 1) {
          message.success('更新成功!');
          history.replace('/article/list');
        }
      }, (err) => {
        const { errorFields } = err;
        message.destroy();
        message.error(errorFields[0].errors);
      });
  }, [form, history, isDraft, params]);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      initData();
    }
  }, [mounted, initData]);

  const imageCommand = React.useMemo<ICommand>(() => {
    return {
      name: 'image',
      keyCommand: 'image',
      buttonProps: { 'aria-label': 'Insert image' },
      icon: (
        <svg width="12" height="12" viewBox="0 0 20 20"><path fill="currentColor" d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"></path></svg>
      ),
      execute: (textState: TextState, textApi: TextApi) => {
        setEditorState((state: UpdateArticleEditState): UpdateArticleEditState => {
          return {
            ...state,
            textState,
            textApi
          };
        });

        setState((state: UpdateArticleState): UpdateArticleState => {
          return {
            ...state,
            showModal: true
          };
        });
      }
    }
  }, []);

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
        title="修改文章"
      />
      <Form 
        form={form}
        initialValues={{
          isDraft,
          category: articleState.category,
          tags: articleState.tags,
          source: articleState.source,
          publishDate: articleState.publishDate,
          title: articleState.title
        }}>
        <FormItemStyled
          name="title"
          label="文章标题"
          rules={[
            {
              required: true,
              message: '请输入文章标题!',
            },
          ]}
        >
          <Input placeholder="请输入文章标题" value={articleState.title} />
        </FormItemStyled>
        <FormItemStyled
          name="category"
          label="文章分类"
          className="fixed-left"
        >
          <Select
            placeholder="请选择文章分类"
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
          name="source"
          label="文章内容"
          rules={[
            {
              required: true,
              message: '请输入文章内容!',
            },
          ]}
        >
          <StyledMDEditor
            height={500}
            onChange={(value: string) => form.setFields([
              {
                name: 'source',
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
        <FormItemStyled
          name="publishDate"
          label="发布日期"
          className="fixed-left"
        >
          <DatePicker
            style={{
              width: '200px'
            }}
            disabledDate={(day: moment.Moment) => {
              return day.isAfter(now.current) && day.isSame(now.current);
            }}
            placeholder="请选择发布日期"
          />
        </FormItemStyled>
        <FormItemStyled
          name="isDraft"
          label="存为草稿"
          className="fixed-left"
          value={isDraft}
        >
          <CheckBoxContainer>
            <Checkbox
              className="is-draft"
              checked={isDraft}
              onChange={() => {
                setIsDraft(() => !isDraft);
              }}
              >
              存为草稿后, 可以在草稿箱看到此文章
            </Checkbox>
          </CheckBoxContainer>
        </FormItemStyled>
      </Form>
      <ButtonContainer>
        <Button type="primary" onClick={UpdateArticle}>更新</Button>
      </ButtonContainer>
      <Modal
        title="选择图片"
        closable={null}
        centered={true}
        visible={state.showModal}
        footer={
          [
            <Button key="close" onClick={cancelSelect}>取消</Button>
          ]
        }
        >
          <ImagesContainer>
            {
              state.images.map((img: FileItem) => {
                return (
                  <RichImage 
                    key={img.id}
                    fileId={img.id}
                    src={file.detail(img.id)}
                    use={insertImage}
                  />
                );
              })
            }
            <UploadButton
              accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
              label="请选择图片"
              onChange={uploadImage}
            />
          </ImagesContainer>
      </Modal>
    </PageContainer>
  );
};

export default React.memo(UpdateArticle);
