import React from 'react';
import styled from '@emotion/styled';
import { Tag } from 'antd';

import hexToRgba from 'hex-to-rgba';

const TagItem = styled<typeof Tag>(Tag)((props: any) => ({
  background: `${hexToRgba(props.color, 0.2)}!important`,
  border: `1px solid ${props.color}`,
  color: props.color
}));

const TagStyled = (props) => {
  return <TagItem {...props} />;
};

export default React.memo(TagStyled);