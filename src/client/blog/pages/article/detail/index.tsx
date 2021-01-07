import React from 'react';

import Link from 'next/link';

import { inject, observer } from 'mobx-react';

import MDEditor from '@uiw/react-md-editor';

import Icon from '@/client/blog/components/icon';
import CommentTree from '@/client/components/comment-tree';

import { PageBaseProps } from '@/client/store';

import { BlogDetailContainer, BlogTitle, BlogInfo, BlogContent, BlogComment } from './style';

const ArticleDetail = observer((props: PageBaseProps) => {
  const { articleDetail } = props.store?.data ?? {};
  const showCategory = React.useMemo(
    () =>
      articleDetail.category !== null &&
      Object.keys(articleDetail.category).length,
    [articleDetail],
  );

  return (
    <BlogDetailContainer>
      <BlogTitle>{articleDetail.title}</BlogTitle>
      <BlogInfo>
        {showCategory && (
          <div className="category-info">
            <Icon type="category" />
            <Link href={`/category/${articleDetail.category.id}`}>
              {articleDetail.category.title}
            </Link>
          </div>
        )}
        {articleDetail.tags.length && (
          <div className="tags">
            <Icon type="tag" />
            {articleDetail.tags.map((tag) => {
              return (
                <a
                  style={{
                    color: tag.color,
                  }}
                  href={`/tag/${tag.id}`}
                  key={tag.id}
                >
                  {tag.title}
                </a>
              );
            })}
          </div>
        )}
        <div className="publish-date">
          <Icon type="time" />
          {articleDetail.publishDate}
        </div>
      </BlogInfo>
      <BlogContent>
        <MDEditor.Markdown source={articleDetail.source} />
      </BlogContent>
      <BlogComment>
        <CommentTree comments={articleDetail.comments} />
      </BlogComment>
    </BlogDetailContainer>
  );
});

export default inject('store')(ArticleDetail);
