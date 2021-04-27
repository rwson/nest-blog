import React from 'react';

import { Comment, Tooltip, Avatar, message } from 'antd';

import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  CommentOutlined,
} from '@ant-design/icons';

import LoginInterceptor from '@/client/components/login-interceptor';

import Http from '@/client/http';

import { avatarUrl, comment } from '@/client/api';

import { CommentTreeContainer, CommentTextAfterIcon } from './style';

type ReplyBtnDataset = {
  id: string;
  name: string;
};

type RenderCommentProps = {
  comments: Array<any>;
  reply: (param: ReplyBtnDataset) => void;
  isReply?: boolean;
  toUser?: string;
};

type CommentTreeProps = {
  comments: Array<any>;
  article: string;
  reload: Function;
};

type CommentTreeState = {
  btnText: string;
  placeholder: string;
  replying: boolean;
  commentId: string;
};

const RenderComment: React.FC<RenderCommentProps> = (
  props: RenderCommentProps,
) => {
  const { comments, isReply, reply, toUser } = props;

  const replyComment = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { currentTarget } = e;
      const dataset = currentTarget.dataset as ReplyBtnDataset;
      reply(dataset);
    },
    [reply],
  );

  const likeOrDislike = React.useCallback((type, comment) => {
    alert(type);
  }, []);

  const action = Math.random() > 0.5 ? 'disliked' : 'liked';

  const actions = (comment) => {
    return [
      <LoginInterceptor key="like" onClick={() => likeOrDislike('like', comment)}>
        <span>
          {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <CommentTextAfterIcon>
            {comment.likes ?? 0}
          </CommentTextAfterIcon>
        </span>
      </LoginInterceptor>,
      <LoginInterceptor key="dislike" onClick={() => likeOrDislike('dislike', comment)}>
        <span>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined,
        )}
        <CommentTextAfterIcon>
          {comment.dislikes ?? 0}
        </CommentTextAfterIcon>
      </span>
      </LoginInterceptor>,
      <LoginInterceptor key="comment-basic-reply-to">
        <span>
          <CommentOutlined />
          <CommentTextAfterIcon>
            回复
          </CommentTextAfterIcon>
        </span>
      </LoginInterceptor>
    ];
  };

  return (
    <>
      {comments.map((comment: any) => {
        return (
          <Comment
            key={comment.id}
            actions={actions(comment)}
            author={<a>Han Solo</a>}
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure).
              </p>
            }
          >
            {(comment.reply ?? []).length > 0 && (
              <RenderComment
                comments={comment.reply}
                isReply={true}
                reply={reply}
                toUser={comment.nickName}
              />
            )}
          </Comment>
        );
      })}
    </>
  );
};

const CommentTree: React.FC<CommentTreeProps> = (props: CommentTreeProps) => {
  const { comments = [], article, reload } = props;

  const [state, setState] = React.useState<CommentTreeState>({
    btnText: '评论',
    placeholder: comments.length
      ? '请输入评论'
      : '该文章暂无评论, 快来抢沙发吧',
    replying: false,
    commentId: '',
  });

  const ref = React.useRef<HTMLDivElement | null>(null);

  const replyComment = React.useCallback((param: ReplyBtnDataset) => {
    setState(
      (state: CommentTreeState): CommentTreeState => {
        return {
          ...state,
          placeholder: '请输入回复内容',
          replying: true,
          btnText: `回复“${param.name}”`,
          commentId: param.id,
        };
      },
    );
  }, []);

  const cancelReply = React.useCallback(() => {
    setState(
      (state: CommentTreeState): CommentTreeState => {
        return {
          ...state,
          btnText: '评论',
          placeholder: comments.length
            ? '请输入评论'
            : '该文章暂无评论, 快来抢沙发吧',
          replying: false,
          commentId: '',
        };
      },
    );
  }, [comments]);

  const submitComment = React.useCallback(async () => {
    if (ref.current) {
      const { current } = ref;
      const [nickNameEl, emailEl, websiteEl, contentEl] = [
        current.querySelector('[name="nickName"]') as HTMLInputElement,
        current.querySelector('[name="email"]') as HTMLInputElement,
        current.querySelector('[name="website"]') as HTMLInputElement,
        current.querySelector('[name="content"]') as HTMLTextAreaElement,
      ];

      const [nickName, email, website, content] = [
        nickNameEl.value.trim(),
        emailEl.value.trim(),
        websiteEl.value.trim(),
        contentEl.value.trim(),
      ];

      message.destroy();

      if (!nickName) {
        return message.error('请输入您的昵称!');
      }

      if (!email) {
        return message.error('请输入您的邮箱!');
      }

      if (!content) {
        return message.error(
          state.replying ? '请输入您的回复内容!' : '请输入您的评论内容!',
        );
      }

      let res;

      if (state.replying) {
        res = await Http.put(comment.reply, {
          nickName,
          email,
          website,
          content,
          article,
          comment: state.commentId,
        });
      } else {
        res = await Http.put(comment.post, {
          nickName,
          email,
          website,
          content,
          article,
        });
      }

      if (res.code === 1) {
        reload();
        cancelReply();
      } else {
        message.error('评论发表失败, 请重试!');
      }
    }
  }, [ref, state, article, cancelReply, reload]);

  return (
    <CommentTreeContainer>
      <RenderComment comments={comments} reply={replyComment} />
    </CommentTreeContainer>
  );
};

export default React.memo(CommentTree);
