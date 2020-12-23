import React from 'react';
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import AppStore from '@/client/store';

import Logo from '@/client/components/logo';
import Iconfont from '@/client/components/iconfont';

import ArticleList from './views/article/list';
import ArticlePublish from './views/article/publish';
import ArticleEdit from './views/article/edit';
import CategoryList from './views/category/list';
import TagList from './views/tag/list';
import CommentList from './views/comment/list';

import { FullLayout, HeaderConsole, LogoContainer, MainContent } from './style';

type ConsoleStateType = {
  collapsed: boolean;
};

const { Sider, Content } = Layout;

const Console = () => {
  const [state, setState] = React.useState<ConsoleStateType>({
    collapsed: false,
  });

  const history = useHistory();

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
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <LogoContainer>
          <Logo size={state.collapsed ? 30 : 80} />
        </LogoContainer>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Iconfont type="tag" />
            <span>标签管理</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Iconfont type="category" />
            <span>分类管理</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Iconfont type="article" />
            <span>文章管理</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Iconfont type="comment" />
            <span>评论管理</span>
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
          <HashRouter>
            <Switch>
              <Route path="/article/list" component={ArticleList} />
              <Route path="/article/publish" component={ArticlePublish} />
              <Route path="/article/edit/:id" component={ArticleEdit} />
              <Route path="/tag/list" component={TagList} />
              <Route path="/category/list" component={CategoryList} />
              <Route path="/comment/list" component={CommentList} />
            </Switch>
          </HashRouter>
        </MainContent>
      </Layout>
    </FullLayout>
  );
};

export default React.memo(Console);
