import styled from '@emotion/styled';

import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

export const FullLayout = styled<any>(Layout)({
  width: '100vw',
  height: '100vh'
});

export const HeaderConsole = styled<any>(Header)({
  background: '#fff',
  height: '80px',
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center'
});

export const LogoContainer = styled.div({
  width: '100%',
  textAlign: 'center',
  padding: '20px'
});

