import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';

import { Layout, Menu, ConfigProvider } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import zhCN from 'antd/lib/locale/zh_CN';

import Logo from '@/client/components/logo';
import Iconfont from '@/client/components/iconfont';

import ArticleList from './views/article/list';
import ArticlePublish from './views/article/publish';
import ArticleEdit from './views/article/edit';
import ArticleDraftList from './views/article/draft-list';
import ArticleRubbishList from './views/article/rubbish-list';
import CategoryList from './views/category/list';
import TagList from './views/tag/list';
import CommentList from './views/comment/list';

import { FullLayout, HeaderConsole, LogoContainer, MainContent } from './style';

import 'rc-color-picker/assets/index.css';

type ConsoleStateType = {
  collapsed: boolean;
  selectedKeys: Array<string>;
};

const { Sider, Content } = Layout;

const Console: React.FC = () => {
  const history = useHistory();

  const mounted = React.useRef<boolean>(false);

  const [state, setState] = React.useState<ConsoleStateType>({
    collapsed: false,
    selectedKeys: [history.location.pathname.split('/')[1]]
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

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      history.listen(() => {
        const { pathname } = history.location;
        setState((state: ConsoleStateType): ConsoleStateType => {
          return {
            ...state,
            selectedKeys: [pathname.split('/')[1]]
          };
        });
      });
    }
  }, [mounted, history]);

  return (
    <ConfigProvider locale={zhCN}>
      <FullLayout>
        <Sider trigger={null} collapsible collapsed={state.collapsed}>
          <LogoContainer>
            <Logo size={state.collapsed ? 30 : 80} />
          </LogoContainer>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={state.selectedKeys}
          >
            <Menu.Item key="tag">
              <Link to="/tag/list">
                <Iconfont type="tag" />
                <span>标签管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="category">
              <Link to="/category/list">
                <Iconfont type="category" />
                <span>分类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="article">
              <Link to="/article/list">
                <Iconfont type="article" />
                <span>文章管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="comment">
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
              <Route path="/article/draft-list" component={ArticleDraftList} />
              <Route
                path="/article/rubbish-list"
                component={ArticleRubbishList}
              />
              <Route path="/article/publish" component={ArticlePublish} />
              <Route path="/article/edit/:id" component={ArticleEdit} />
              <Route path="/tag/list" component={TagList} />
              <Route path="/category/list" component={CategoryList} />
              <Route path="/comment/list" component={CommentList} />
            </Switch>
          </MainContent>
        </Layout>
      </FullLayout>
    </ConfigProvider>
  );
};

const ConsolePage: React.FC = () => (
  <HashRouter>
    <Console />
  </HashRouter>
);

export default React.memo(ConsolePage);
