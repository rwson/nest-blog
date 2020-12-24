import React from 'react';
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import { observer, inject } from 'mobx-react';

import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Logo from '@/client/components/logo';
import Iconfont from '@/client/components/iconfont';
import LoadingDark from '@/client/admin/components/loading-dark';

import appStore, { Store } from '@/client/store';

import ArticleList from './views/article/list';
import ArticlePublish from './views/article/publish';
import ArticleEdit from './views/article/edit';
import CategoryList from './views/category/list';
import TagList from './views/tag/list';
import CommentList from './views/comment/list';

import { FullLayout, HeaderConsole, LogoContainer, MainContent } from './style';

import 'rc-color-picker/assets/index.css';

type ConsoleStateType = {
  collapsed: boolean;
};

type ConsoleProps = {
  store: Store;
};

const { Sider, Content } = Layout;

const Console: React.FC<ConsoleProps> = ({ store }: ConsoleProps) => {
  const [state, setState] = React.useState<ConsoleStateType>({
    collapsed: false,
  });

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
    <FullLayout>
      <HashRouter>
        <Sider trigger={null} collapsible collapsed={state.collapsed}>
          <LogoContainer>
            <Logo size={state.collapsed ? 30 : 80} />
          </LogoContainer>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/tag/list">
                <Iconfont type="tag" />
                <span>标签管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/category/list">
                <Iconfont type="category" />
                <span>分类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/article/list">
                <Iconfont type="article" />
                <span>文章管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/comment/list">
                <Iconfont type="comment" />
                <span>评论管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <HeaderConsole>
            {state.collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={toggle} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={toggle} />
            )}
          </HeaderConsole>
          <MainContent>
            <Switch>
              <Route path="/article/list" component={ArticleList} />
              <Route path="/article/publish" component={ArticlePublish} />
              <Route path="/article/edit/:id" component={ArticleEdit} />
              <Route path="/tag/list" component={TagList} />
              <Route path="/category/list" component={CategoryList} />
              <Route path="/comment/list" component={CommentList} />
            </Switch>
          </MainContent>
        </Layout>
        {store.loading && <LoadingDark />}
      </HashRouter>
    </FullLayout>
  );
};

export default inject('store')(observer(Console));
