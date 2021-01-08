import styled from '@emotion/styled';

export const LayoutContainer = styled.div({
  width: '100vw',
  height: '100vh'
});

export const LayoutHeader = styled.div({
  width: '100%',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 5%',
  boxSizing: 'border-box',
  '.header-links': {
    'a': {
      margin: '0 5px',
      color: '#666',
      '&:hover': {
        color: '#333'
      }
    }
  }
});