export default {
  //  发表评论
  postCommentContentNotEmpty: {
    code: 700001,
    message: '发表评论-内容不能为空!',
  },
  postCommentArticleError: {
    code: 700002,
    message: '发表评论-文章id不合法!',
  },

  //  回复评论
  replyCommentArticleError: {
    code: 700003,
    message: '回复评论-文章id不合法!',
  },
  replyCommentIdError: {
    code: 700004,
    message: '回复评论-评论id不合法!',
  },
  replyCommentContentNotEmpty: {
    code: 700005,
    message: '回复评论-内容不能为空!',
  },

  //  评论点赞
  likeCommentExist: {
    code: 700006,
    message: '评论点赞-你已经点过赞啦!',
  },

  //  评论点贬
  dislikeCommentExist: {
    code: 700007,
    message: '评论点赞-你已经点过贬啦!',
  }
};
