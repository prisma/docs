import React from 'react';

type CodeProps = React.ReactNode;

const getSettings = (className: any) => {
  let copy = false;
  if (className) {
    const split = className.split('-');
    if (split.length > 1) {
      copy = split[1].includes('copy');
    }
  }
  return copy;
};

const Code = ({ className, children, ...props }: CodeProps) => {
  const modifiedClassName = getSettings(className) ? className.replace('copy', '') : className;
  return (
    <code {...props} className={modifiedClassName}>
      {children}
    </code>
  );
};

export default Code;
