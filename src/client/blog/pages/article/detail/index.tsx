import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import MDEditor from '@uiw/react-md-editor';
import { selectArticleDetail } from '@/client/redux/selector';
import { fetchArticleDetail } from '@/client/redux/store/slices/article-detail';

import Icon from '@/client/blog/components/icon';
import CommentTree from '@/client/components/comment-tree';

import { BlogDetailContainer, BlogTitle, BlogInfo, BlogContent, BlogComment } from './style';

const ArticleDetail: React.FC<any> = ({ pageData, store }: any) => {

  const articleDetail = useSelector(selectArticleDetail);
  const dispatch = useDispatch();
  const router = useRouter();

  const showCategory = React.useMemo(
    () => Boolean(Object.keys(articleDetail.category ?? {}).length),
    [articleDetail],
  );

  const showTags = React.useMemo(
    () => Boolean(Object.keys(articleDetail.tags ?? {}).length),
    [articleDetail],
  );

  const reloadDetail = React.useCallback(() => {
    dispatch(fetchArticleDetail(router.query.id as string));
  }, [router]);

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
        {showTags && (
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
        <div className="view-count">
          <Icon type="eye" />
          {articleDetail.viewsCount}
        </div>
      </BlogInfo>
      <BlogContent>
        {/* <MDEditor.Markdown source={articleDetail.source} /> */}
      </BlogContent>
      <BlogComment>
        <CommentTree comments={articleDetail.comments} article={articleDetail.id} reload={reloadDetail} />
      </BlogComment>
    </BlogDetailContainer>
  );
};

export default React.memo(ArticleDetail);

