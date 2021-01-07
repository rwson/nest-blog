import React from 'react';

import classnames from 'classnames';

import { LayoutContainer, LayoutHeader } from './style';

type BlogLayoutProps = {
  children: any;
  deviceInfo: {
    [key: string]: any;
  };
  isMobile: boolean;
};

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, deviceInfo, isMobile }: BlogLayoutProps) => {
  return (
    <LayoutContainer className={classnames([
      isMobile ? 'mobile-container' : 'desktop-container',
      `${deviceInfo.os.name}`
    ])}>
      <LayoutHeader
        className={classnames([
          isMobile ? 'mobile-header' : 'desktop-header'
        ])}>
      </LayoutHeader>
      {children}
    </LayoutContainer>
  );
};

export default React.memo(BlogLayout);