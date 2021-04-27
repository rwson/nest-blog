import React from 'react';

import Link from 'next/link';

import classnames from 'classnames';

import Logo from '@/client/components/logo';

import { LayoutContainer, LayoutHeader } from './style';

type BlogLayoutProps = {
  children: any;
  deviceInfo?: {
    [key: string]: any;
  };
  isMobile?: boolean;
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
          <Logo />
          <div className="header-links">
            <Link href="/blog">博客</Link>
            <Link href="/category">分类</Link>
            <Link href="/archives">归档</Link>
            <Link href="https://github.com/rwson">GitHub</Link>
          </div>
      </LayoutHeader>
      {children}
    </LayoutContainer>
  );
};

export default React.memo(BlogLayout);