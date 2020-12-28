import styled from '@emotion/styled';
import MDEditor from '@uiw/react-md-editor';

export const PageContainer = styled.div({
  overflow: 'scroll',
  height: 'calc(100vh - 200px)',
  padding: '0 10px 0 0'
});

export const StyledMDEditor = styled<any>(MDEditor)({
  overflow: 'hidden',
  borderRadius: '2px'
});