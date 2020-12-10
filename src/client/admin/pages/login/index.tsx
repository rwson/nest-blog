import React from 'react';
import Router from 'next/router';
import { Icon, message } from 'antd';

import LoadingSpin from '@/client/admin/components/loading.dark';

import HttpClient from '@/client/http';

import { user } from '@/client/api';

import { LoginPage, LoginForm, LoginLogo, LoginFormRow, LoginButton, LoginInput } from './style';

type UserLoginResponseType = {
  readonly token: string;
  readonly email: string;
  readonly userName: string;
  readonly avatar: string;
  readonly type: string;
};

type LoginStateTypes = {
  account: string;
  password: string;
  loading: boolean;
};

type LoginValueChangedTypes = {
  account?: string;
  password?: string;
};

const Login: React.FC = () => {
  const [state, setState] = React.useState<LoginStateTypes>({
    account: '',
    password: '',
    loading: false
  });

  const toggleLoading = React.useCallback(() => {
    setState((state: LoginStateTypes): LoginStateTypes => {
      return {
        ...state,
        loading: !state.loading
      }
    });
  }, [setState]);

  const valueChanged = React.useCallback((value: LoginValueChangedTypes) => {
    setState((state: LoginStateTypes): LoginStateTypes => {
      return {
        ...state,
        ...value
      };
    });
  }, [setState]);

  const handleLogin = React.useCallback(async() => {
    if (!state.account) {
      message.error('请先输入账号!');
      return;
    }

    if (!state.password) {
      message.error('请先输入密码!');
      return;
    }

    toggleLoading();

    const res = await HttpClient.post<UserLoginResponseType>(user.login, {
      account: state.account,
      password: state.password
    });

    if (res.code === 1) {
      message.success('登录成功!');
      Router.push('/admin/console');
    }

    toggleLoading();
  }, [state, toggleLoading]);

  return (
    <LoginPage>
      <LoginForm>
        <LoginLogo />
        <LoginFormRow>
          <LoginInput
            prefix={<Icon type="user" style={{ color: '#838f9e' }} />}
            placeholder="请输入账号"
            value={state.account}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueChanged({
              account: e.currentTarget.value.trim()
            })}
          />
        </LoginFormRow>
        <LoginFormRow>
          <LoginInput
            type="password"
            prefix={<Icon type="lock" style={{ color: '#838f9e' }} />}
            placeholder="请输入密码"
            value={state.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueChanged({
              password: e.currentTarget.value.trim()
            })}
          />
        </LoginFormRow>
        <div className="login-form-btn">
          <LoginButton type="primary" onClick={handleLogin}>
            登录
          </LoginButton>
        </div>
      </LoginForm>
      {
        state.loading && <LoadingSpin />
      }
    </LoginPage>
  );
};

export default React.memo(Login);
