import React from 'react';
import styled from 'styled-components';
import CopyButton from './copy';
import Copy from '../../icons/Copy';
import { stringify } from '../../utils/stringify';

type PreBlockProps = React.ReactNode;

const getSettings = (className: any) => {
  let copy = false;
  if (className) {
    const split = className.split('-');
    if (split.length > 1) {
      copy = split[1].substr(split.length - 6) === 'copy';
    }
  }
  return copy;
};

const Pre = ({ languages, children, ...props }: PreBlockProps) => {
  const copy = getSettings(props.className);
  const code = stringify(children);

  return (
    <PreWrapper {...props}>
      {children}
      {copy && (
        <AbsoluteCopyButton>
          <CopyButton text={code}>
            <Copy />
          </CopyButton>
        </AbsoluteCopyButton>
      )}
    </PreWrapper>
  );
};

export default Pre;

const PreWrapper = styled.pre`
  margin-top: 2rem;
  position: relative;
`;

const AbsoluteCopyButton = styled.div`
  transition: opacity 100ms ease;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  > div {
    right: -8px;
    top: -2px;
  }
`;
