import styled from '@emotion/styled';

import { Button, Input } from 'antd';

export const LoginPage = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: '#2d3a4b'
});

export const LoginForm = styled.div({
  width: '450px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
  padding: '35px 20px 20px',
  border: '1px solid rgba(255, 255, 255, 0.1)'
});

export const LoginLogo = styled.div({
  width: '165px',
  height: '50px',
  backgroundSize: 'auto 50px',
  margin: '0 auto'
});

export const LoginFormRow = styled.div({
  margin: '15px 30px 0',
  boxShadow: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '3px',
  padding: '5px',
  background: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.1)'
});

export const LoginButton = styled<any>(Button)({
  display: 'block',
  width: '348px',
  margin: '15px auto 0'
});

export const LoginInput = styled<any>(Input)({
  background: 'transparent',
  border: 'none',
  color: '#838f9e',
  boxShadow: 'none',
  fontSize: '14px',
  placeholder: {
    color: '#838f9e'
  }
});