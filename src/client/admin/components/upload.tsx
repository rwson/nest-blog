import React from 'react';
import styled from '@emotion/styled';

import IconFont from '@/client/components/iconfont';

type UploadProps = {
  accept: string;
  label?: string;
  uploadSuccess?: Function;
  onChange?: (file?: File) => void;
};

const UploadWrapper = styled.div({
  width: '80px',
  height: '80px',
  borderRadius: '3px',
  border: '1px solid #f2f2f2',
  position: 'relative',
  overflow: 'hidden',
  '.icon-container': {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    '.upload-icon': {
      fontSize: '26px',
      fontWeight: 'bold',
      padding: '20px 0 0',
      'svg': {
        color: '#777'
      }
    }
  },
  '.file-selector': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    opacity: 0,
    zIndex: 9
  },
  '.label': {
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: '8px',
    fontSize: '12px',
    color: '#666'
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
      <div className="icon-container">
        <IconFont className="upload-icon" type="upload" />
      </div>
      <span className="label">{props.label || '请选择文件'}</span>
      <input className="file-selector" type="file" accept={props.accept} onChange={inputChanged} />
    </UploadWrapper>
  );
};

export default React.memo(UploadButton);
