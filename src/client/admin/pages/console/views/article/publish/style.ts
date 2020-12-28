import styled from '@emotion/styled';
import MDEditor from '@uiw/react-md-editor';

export const PageContainer = styled.div({
  overflow: 'scroll',
  height: 'calc(100vh - 200px)',
  padding: '0 10px 0 0'
});

export const StyledMDEditor = styled<typeof MDEditor>(MDEditor)({
  overflow: 'hidden',
  borderRadius: '2px'
});

export const ImagesContainer = styled.div({
  '.rich-image': {
    display: 'inline-block',
    margin: '0 4px'
  },
  '.uploader': {
    display: 'inline-block',
    margin: '0 4px'
  }
});
