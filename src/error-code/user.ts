export default {
  //  登录
  loginAccountNotEmpty: {
    code: 200001,
    message: '用户登录-账号不能为空!',
  },
  loginPasswordNotEmpty: {
    code: 200002,
    message: '用户登录-密码不能为空!',
  },
  loginUserNotExist: {
    code: 200003,
    message: '用户登录-账号密码不正确或者账号不存在!',
  },

  //  创建用户
  createUserAccountNotEmpty: {
    code: 200004,
    message: '创建用户-账号不能为空!',
  },
  createUserPasswordNotEmpty: {
    code: 200005,
    message: '创建用户-密码不能为空!',
  },
  createUserNameNotEmpty: {
    code: 200006,
    message: '创建用户-用户名不能为空!',
  },
  createUserEmailNotEmpty: {
    code: 200006,
    message: '创建用户-邮箱不能为空!',
  },

  //  校验登录
  checkLoginUserNotExist: {
    code: 200007,
    message: '确认登录-用户不存在!',
  },

  //  用户未登录
  unauthorized: {
    code: 200008,
    message: '请先登录!',
  }
};
