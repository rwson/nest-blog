import styled from '@emotion/styled';

export const CommentItem = styled.div({
  position: 'relative',
  padding: '12px 0 0',
  border: 'none',
  borderTop: 'none',
  lineHeight: '1.2',
  '&.reply': {
    margin: '6px',
    padding: '6px 0 0 10px',
  },
  '.container': {
    display: 'flex',
    '.avatar': {
      width: '35px',
      height: '35px',
    },
    '.comment-detail': {
      padding: '0 0 0 6px',
      '.nickname': {
        color: '#333',
        fontWeight: 400,
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        '.comment-time': {
          color: '#666',
          fontSize: '12px',
          padding: '0 0 0 6px'
        }
      },
      '.comment-text': {
        padding: '5px 0'
      },
      '.functions': {
        '.btn': {
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: '#666',
          '.iconfont': {
            color: '#666',
            fontSize: '14px',
            margin: '0 5px 0 0'
          },
          '&:hover': {
            color: '#333',
            '.iconfont': {
              color: '#333',
            }
          }
        }
      }
    }
  }
});
