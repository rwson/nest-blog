import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Space } from 'antd';
import { stringifyUrl } from 'query-string';

import Icon from '@/client/blog/components/icon';

import { selectOAuthLogined } from '@/client/redux/selector';

import { oauth } from '@/client/api';

import { LoginChannelContainer } from './style';

type LoginInterceptorProps = {
  children: any;
  onClick?: (e: React.SyntheticEvent, ...argus) => void;
  [key: string]: unknown;
}

type OAuthLinksType = {
  google: string;
  github: string;
};

const noop: Function = () => {};

const LoginInterceptor: React.FC<LoginInterceptorProps> = ({ children, onClick, ...props }: LoginInterceptorProps) => {
  const [ showModal, setShowModal ] = React.useState(false);

  const oAuthLogined = useSelector(selectOAuthLogined);

  const realClickCallback = React.useCallback((e, ...argus) => {
    if (typeof onClick === 'function') {
      onClick(e, ...argus);
    } else {
      noop();
    }
  }, [onClick]);

  const toggleModal = React.useCallback(() => {
    setShowModal(() => !showModal);
  }, [showModal, setShowModal]);

  const clickInterceptor = React.useCallback((e) => {
    if (!oAuthLogined) {
      toggleModal();
    } else {
      realClickCallback(e);
    }
  }, [realClickCallback, toggleModal, oAuthLogined]);

  const toGitHub = React.useCallback(() => {
    const redirect: string = window.location.href;
    window.location.href = stringifyUrl({
      url: oauth.github,
      query: {
        redirect: decodeURIComponent(redirect)
      }
    });
  }, []);

  const toGoogle = React.useCallback(() => {
    const redirect: string = window.location.href;
    console.log(stringifyUrl({
      url: oauth.google,
      query: {
        redirect: decodeURIComponent(redirect)
      }
    }));
  }, []);

  const useGuest = React.useCallback(() => {
      
    }, []
  );

  const newProps = Object.assign({}, props);
  newProps.onClick = clickInterceptor;

  return (
    <>
      {
        showModal &&
        <Modal
          title="此操作需要登录哦~"
          width={300}
          visible={showModal}
          footer={null}
          closable={true}
          destroyOnClose={true}
          centered={true}
          onCancel={toggleModal}
        >
          <Space size="large">
            <LoginChannelContainer onClick={toGitHub}>
              <Icon useSvg={true} type="github" />
              <p className="desc">GitHub</p>
            </LoginChannelContainer>
            <LoginChannelContainer onClick={toGoogle}>
              <Icon useSvg={true} type="google" />
              <p className="desc">Google</p>
            </LoginChannelContainer>
          </Space>
        </Modal>
      }
      {
        React.cloneElement(children, newProps)
      }
    </>
  );
};

export default React.memo(LoginInterceptor);
