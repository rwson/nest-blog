import article from './article';
import category from './category';
import comment from './comment';
import file from './file';
import tag from './tag';
import user from './user';

export default {
  success: {
    code: 1,
    message: '成功!',
  },

  ...article,
  ...category,
  ...comment,
  ...file,
  ...tag,
  ...user,
};
