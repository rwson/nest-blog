import React from 'react';

import classnames from 'classnames';

type IconProps = {
  type: string;
  useSvg?: boolean;
};

const Icon: React.FC<IconProps> = ({ type, useSvg }: IconProps) => {
  return (
    <>
      {
        useSvg ?
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#${type}`}></use>
        </svg>
        :
        <i className={classnames([
          'iconfont',
          type
        ])}></i>
      }
    </>
  );
};

export default React.memo(Icon);
