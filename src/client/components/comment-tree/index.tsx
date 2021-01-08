import React from 'react';

import classnames from 'classnames';

import { message } from 'antd';

import Http from '@/client/http';

import { avatarUrl, comment } from '@/client/api';

import { CommentItem, CommentTreeContainer } from './style';

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

const RenderComment: React.FC<RenderCommentProps> = (props: RenderCommentProps) => {
  const { comments, isReply, reply, toUser } = props;

  const replyComment = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    const dataset = currentTarget.dataset as ReplyBtnDataset;
    reply(dataset);
  }, [reply]);

  return (
    <>
      {
        comments.map((comment: any, index: number) => {
          return (
            <CommentItem key={comment.id} className={classnames({
              reply: isReply
            })}>
              <div className="container">
                <div className="avatar">
                  <img className="avatar-img" src={avatarUrl(comment.nickName)} />
                </div>
                <div className="comment-detail">
                  <p className="nickname">
                    {comment.nickName}
                    {
                      isReply &&
                      (
                        <>
                          <span className="reply-to">回复</span>
                          {toUser}
                        </>
                      )
                    }
                    <span className="comment-time">{comment.createdAt}</span>
                  </p>
                  <p className="comment-text">{comment.content}</p>
                  <div className="functions">
                    <div className="btn" data-id={comment.id} data-name={comment.nickName} onClick={replyComment}>
                      <i className="iconfont comment"></i>
                      回复
                    </div>
                  </div>
                </div>
              </div>
              {
                (comment.reply.length > 0) && <RenderComment comments={comment.reply} isReply={true} reply={reply} toUser={comment.nickName} />
              }
            </CommentItem>
          );
        })
      }
    </>
  );
};

const CommentTree: React.FC<CommentTreeProps> = (props: CommentTreeProps) => {
  const { comments, article, reload } = props;

  const [ state, setState ] = React.useState<CommentTreeState>({
    btnText: '评论',
    placeholder: comments.length ? '请输入评论' : '该文章暂无评论, 快来抢沙发吧',
    replying: false,
    commentId: ''
  });

  const ref = React.useRef<HTMLDivElement|null>(null);

  const replyComment = React.useCallback((param: ReplyBtnDataset) => {
    setState((state: CommentTreeState): CommentTreeState => {
      return {
        ...state,
        placeholder: '请输入回复内容',
        replying: true,
        btnText: `回复“${param.name}”`,
        commentId: param.id
      };
    });
  }, []);

  const cancelReply = React.useCallback(() => {
    setState((state: CommentTreeState): CommentTreeState => {
      return {
        ...state,
        btnText: '评论',
        placeholder: comments.length ? '请输入评论' : '该文章暂无评论, 快来抢沙发吧',
        replying: false,
        commentId: ''
      };
    });
  }, [comments]);

  const submitComment = React.useCallback(async() => {
    if (ref.current) {
      const { current } = ref;
      const [
        nickNameEl,
        emailEl,
        websiteEl,
        contentEl
      ] = [
        current.querySelector('[name="nickName"]') as HTMLInputElement,
        current.querySelector('[name="email"]') as HTMLInputElement,
        current.querySelector('[name="website"]') as HTMLInputElement,
        current.querySelector('[name="content"]') as HTMLTextAreaElement
      ];

      const [
        nickName,
        email,
        website,
        content
      ] = [
        nickNameEl.value.trim(),
        emailEl.value.trim(),
        websiteEl.value.trim(),
        contentEl.value.trim()
      ];

      message.destroy();

      if (!nickName) {
        return message.error('请输入您的昵称!');
      }

      if (!email) {
        return message.error('请输入您的邮箱!');
      }

      if (!content) {
        return message.error(state.replying ? '请输入您的回复内容!' : '请输入您的评论内容!');
      }

      let res;

      if (state.replying) {
        res = await Http.put(comment.reply, {
          nickName,
          email,
          website,
          content,
          article,
          comment: state.commentId
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
      <div className="comment-place" ref={ref}>
        <div className="comment-row">
          <input type="text" name="nickName" placeholder="请输入您的昵称(必填)" />
        </div>
        <div className="comment-row">
          <input type="text" name="email" placeholder="请输入您的邮箱(必填)" />
        </div>
        <div className="comment-row">
          <input type="text" name="website" placeholder="请输入您的网站" />
        </div>
        <div className="comment-row">
          <textarea name="content" placeholder={state.placeholder}></textarea>
        </div>
        <div className="comment-row">
          {
            state.replying && (<div className="btn cancel" onClick={cancelReply}>取消回复</div>)
          }
          <div className="btn" onClick={submitComment}>{state.btnText}</div>
        </div>
      </div>
    </CommentTreeContainer>
  );
};

export default React.memo(CommentTree);