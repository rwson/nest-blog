import React from 'react';
import styled from '@emotion/styled';
import { Popconfirm, Modal } from 'antd';

import IconFont from '@/client/components/iconfont';

type ImageProps = {
  fileId: string;
  src: string;
  delete?: Function;
};

const StyledContainer = styled.div({
  width: '80px',
  height: '80px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '3px',
  border: '1px solid #ccc',
  '.img': {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  '.mask': {
    background: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'all 0.3s',
    transformOrigin: 'center',
    transform: 'scale(1.5)',
    opacity: 0,
    '&:hover': {
      opacity: 1,
      transform: 'scale(1)',
      cursor: 'pointer'
    },
    '.mask-part': {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      svg: {
        color: '#fff'
      }
    }
  }
});

const Image: React.FC<ImageProps> = (props: ImageProps) => {
  const confirmDelete = React.useCallback(() => {
    if (typeof props.delete === 'function') {
      props.delete(props.fileId);
    }
  }, [props.delete]);

  return (
    <StyledContainer className="rich-image">
      <img className="img" src={props.src} />
      <div className="mask">
        <div className="mask-part">
          <IconFont type="preview" />
        </div>
        <Popconfirm
          title="你确定要删除此图片吗, 这可能导致之前文章的图片不可访问?"
          onConfirm={confirmDelete}
          className="mask-part"
          okText="确定"
          okType="danger"
          cancelText="取消"
        >
          <IconFont type="delete" />
        </Popconfirm>
      </div>
    </StyledContainer>
  );
};

const RichImage: React.FC<ImageProps> = (props: ImageProps) => {
  return <Image {...props} />;
};

export default RichImage;
