import React from 'react';

type LogoProps = {
  size?: number;
};

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const size: number = props.size ?? 50;
  return (
    <img
      src="http://localhost:3001/logo.png"
      style={{
        transition: 'all 0.3s',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default React.memo(Logo);
