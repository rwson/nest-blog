import React from 'react';
import * as Router from 'next/router';
import { Observer, useLocalStore, useLocalObservable } from 'mobx-react';

import { Layout, Menu, Icon } from 'antd';

import AppStore from '@/client/store';

import Logo from '@/client/components/logo';
import Iconfont from '@/client/components/iconfont';

import { FullLayout, HeaderConsole, LogoContainer } from './style';

type ConsoleStateType = {
  collapsed: boolean;
};

const { Header, Sider, Content } = Layout;

const Console = () => {
  const [state, setState] = React.useState<ConsoleStateType>({
    collapsed: false,
  });

  const store = useLocalStore(() => AppStore);

  console.log(store);

  const toggle = React.useCallback(() => {
    setState(
      (state: ConsoleStateType): ConsoleStateType => {
        return {
          ...state,
          collapsed: !state.collapsed,
        };
      },
    );
  }, [setState]);

  return (
    <Observer>
      {
        () => (
          <FullLayout>
          <Sider trigger={null} collapsible collapsed={state.collapsed}>
            <LogoContainer>
              <Logo size={state.collapsed ? 30 : 80} />
            </LogoContainer>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Iconfont type="tag" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Iconfont type="category" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Iconfont type="article" />
                <span>nav 3</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Iconfont type="comment" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <HeaderConsole>
              <Icon
                className="trigger"
                type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggle}
              />
            </HeaderConsole>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </FullLayout>
        )
      }
    </Observer>
  );
};

export default React.memo(Console);
