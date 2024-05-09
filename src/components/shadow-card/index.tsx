import React from 'react';
import styles from './styles.module.scss';

const ShadowCard = ({ starter, className, ...rest }: any) => (
  <div className={`${className ? `${className} ` : ``}${styles.cardLibWrapper}`} {...rest}>
    {rest.children}
  </div>
);

export default ShadowCard;
