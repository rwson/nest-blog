import React from 'react';
import styled from '@emotion/styled';

import IconFont from '@/client/components/iconfont';

type UploadProps = {
  accept: string;
  uploadSuccess?: Function;
  onChange?: (file?: File) => void;
};

const UploadWrapper = styled.div({
  width: '80px',
  height: '80px',
  borderRadius: '3px',
  border: '1px solid #ccc',
  position: 'relative',
  '.file-selector': {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0
  }
});

const UploadButton: React.FC<UploadProps> = (props: UploadProps) => {
  const inputChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {currentTarget} = e;

    if (typeof props.onChange === 'function') {
      props.onChange(currentTarget.files.item(0));
    }
  }, [props.onChange]);


  return (
    <UploadWrapper className="uploader">
      <IconFont type="upload" />
      <input className="file-selector" type="file" accept={props.accept} onChange={inputChanged} />
    </UploadWrapper>
  );
};
