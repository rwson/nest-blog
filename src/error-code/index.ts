import article from './article';
import tag from './tag';
import user from './user';

export default {
  success: {
    code: 1,
    message: '成功!'
  },

  ...article,
  ...tag,
  ...user
};