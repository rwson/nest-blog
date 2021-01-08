import styled from '@emotion/styled';

export const BlogDetailContainer = styled.div({
  padding: '10px',
  maxWidth: '90%',
  margin: '0 auto',
});

export const BlogTitle = styled.h1({
  color: '#333',
  fontSize: '20px',
  fontWeight: 400,
  textAlign: 'center',
  lineHeight: '40px',
});

export const BlogInfo = styled.div({
  margin: '15px 0',
  display: 'flex',
  padding: '10px 0',
  borderTop: 'thin dashed #f2f2f2',
  borderBottom: 'thin dashed #f2f2f2',
  '.tags, .category-info, .publish-date, .view-count': {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px 0 0',
    padding: '0 6px',
    '.iconfont': {
      color: '#666',
      fontSize: '14px',
      margin: '0 3px 0 0',
      fontWeight: 400
    },
    '&.category-info .iconfont': {
      fontSize: '12px'
    },
    '&.view-count .iconfont': {
      fontSize: '18px'
    }
  },
  'a': {
    color: '#666',
    margin: '0 3px',
    '&:hover': {
      color: '#333'
    }
  }
});

export const BlogContent = styled.div({
  padding: '0 0 10px',
  borderBottom: 'thin dashed #f2f2f2',
  '.wmde-markdown': {
    '> p, > pre, ul': {
      margin: '0 0 6px',
    },
    '.comment': {
      '&:before': {
        display: 'none'
      }
    },
    'img': {
      margin: '6px 0'
    }
  }
});

export const BlogComment = styled.div({

});