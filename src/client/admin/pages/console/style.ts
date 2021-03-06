import styled from '@emotion/styled';

import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

export const FullLayout = styled<any>(Layout)({
  width: '100vw',
  height: '100vh',
});

export const HeaderConsole = styled<any>(Header)({
  background: '#fff',
  height: '80px',
  padding: '0 13px',
  display: 'flex',
  alignItems: 'center',
});

export const MainContent = styled<any>(Content)({
  margin: '10px 10px',
  padding: 20,
  background: '#fff',
  minHeight: 280,
});

export const LogoContainer = styled.div({
  width: '100%',
  textAlign: 'center',
  padding: '20px',
});
