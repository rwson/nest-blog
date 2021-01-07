import React from 'react';

import classnames from 'classnames';

type IconProps = {
  type: string;
};

const Icon: React.FC = (props: IconProps) => {
  return (
    <i className={classnames([
      'iconfont',
      props.type
    ])}></i>
  );
};

export default React.memo(Icon);
