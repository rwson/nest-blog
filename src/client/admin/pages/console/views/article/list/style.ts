import styled from '@emotion/styled';

export const ImportModalContent = styled.div({
  minHeight: '150px',
  maxHeight: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  '.preview-content': {
    maxHeight: '300px',
    overflow: 'auto'
  },
  '.wmde-markdown': {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '4px',
    margin: '0 10px 0 0'
  }
});