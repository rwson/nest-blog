import styled from '@emotion/styled';

export const CommentTreeContainer = styled.div({
  '.comment-place': {
    margin: '15px 0 0',
    '.comment-row': {
      padding: '0 0 10px',
      display: 'flex',
      justifyContent: 'flex-end',
      'input': {
        width: '400px',
        height: '30px',
        border: 'thin solid #f2f2f2',
        borderRadius: '3px',
        textIndent: '5px'
      },
      'textarea': {
        resize: 'none',
        width: '400px',
        height: '100px',
        borderRadius: '3px',
        border: 'thin solid #f2f2f2',
        padding: '5px'
      },
      '.btn': {
        padding: '5px 10px',
        borderRadius: '3px',
        color: '#fff',
        background: '#1890ff',
        cursor: 'pointer',
        '&.cancel': {
          color: 'rgba(0,0,0,.85)',
          background: '#fff',
          border: 'thin solid #d9d9d9',
          margin: '0 10px 0 0'
        }
      }
    }
  }
});

export const CommentItem = styled.div({
  position: 'relative',
  padding: '12px 0 10px',
  border: 'none',
  borderTop: 'none',
  lineHeight: '1.2',
  '&:not(.reply)': {
    borderBottom: 'thin dashed #f2f2f2'
  },
  '&.reply': {
    margin: '10px 6px 0',
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
        '.reply-to': {
          color: '#666',
          fontSize: '12px',
          padding: '0 3px',
          lineHeight: '30px'
        },
        '.comment-time': {
          color: '#666',
          fontSize: '12px',
          padding: '0 0 0 6px',
          lineHeight: '30px'
        }
      },
      '.comment-text': {
        padding: '10px 0'
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
