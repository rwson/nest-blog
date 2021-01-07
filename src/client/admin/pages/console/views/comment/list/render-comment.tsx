import React from 'react';

import { Collapse } from 'antd';

import { CommentItem } from '@/dto/comment/response';

type RenderCommentProps = {
  comments: Array<CommentItem> | CommentItem;
};

const RenderComment: React.FC<RenderCommentProps> = (
  props: RenderCommentProps,
) => {
  const { comments } = props;

  if (Array.isArray(comments) && comments.length) {
    return (
      <>
        {
          comments.map((comment: CommentItem) => {
            return <RenderComment key={comment.id} comments={comment} />
          })
        }
      </>
    );
  } else {
    const comment = comments as CommentItem;
    return (
      <Collapse key={comment.id} bordered={false}>
        <Collapse.Panel
          header={'test'}
          extra={`${(comment.reply ?? []).length}条回复`}
          key={comment.id}
        >
          {
            comment?.reply?.length > 0 && <RenderComment comments={comment.reply} />
          }
        </Collapse.Panel>
      </Collapse>
    );
  }
};

export default React.memo(RenderComment);
