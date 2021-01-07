import React from 'react';

import classnames from 'classnames';

import { avatarUrl } from '@/client/api';

import { CommentItem } from './style';

type CommentTreeProps = {
  comments: Array<any>;
  indexs?: Array<number>;
  isReply?: boolean;
};

const CommentTree = (props: CommentTreeProps) => {
  const { comments, isReply, indexs = [] } = props;

  return (
    <>
      {
        comments.map((comment: any, index: number) => {
          return (
            <CommentItem className={classnames({
              reply: isReply
            })}>
              <div className="container">
                <div className="avatar">
                  <img className="avatar-img" src={avatarUrl(comment.nickName)} />
                </div>
                <div className="comment-detail">
                  <p className="nickname">
                    {comment.nickName}
                    <span className="comment-time">{comment.createdAt}</span>
                  </p>
                  <p className="comment-text">{comment.content}</p>
                  <div className="functions">
                    <div className="btn" data-id={comment.id}>
                      <i className="iconfont comment"></i>
                      回复
                    </div>
                  </div>
                </div>
              </div>
              {
                (comment.reply.length > 0) && <CommentTree comments={comment.reply} isReply={true} indexs={indexs} />
              }
            </CommentItem>
          );
        })
      }
    </>
  );
};

export default React.memo(CommentTree);