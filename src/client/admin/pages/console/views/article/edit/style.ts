import styled from '@emotion/styled';
import MDEditor from '@uiw/react-md-editor';
import { Checkbox } from 'antd';

export const PageContainer = styled.div({
  overflow: 'scroll',
  height: 'calc(100vh - 200px)',
  padding: '0 10px 0 0'
});

export const StyledMDEditor = styled<typeof MDEditor>(MDEditor)({
  overflow: 'hidden',
  borderRadius: '2px'
});

export const CheckBoxContainer = styled.div({
  '.is-draft': {
    'span': {
      fontSize: '12px!important',
      color: '#666'
    }
  }
});

export const ButtonContainer = styled.div({
  margin: '20px 0 0',
  display: 'flex',
  justifyContent: 'center'
});

export const ImagesContainer = styled.div({
  overflow: 'hidden',
  '.rich-image': {
    display: 'inline-block',
    margin: '0 4px 8px',
    float: 'left'
  },
  '.uploader': {
    display: 'inline-block',
    margin: '0 4px 8px',
    float: 'left'
  }
});
