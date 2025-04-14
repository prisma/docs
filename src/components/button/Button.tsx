import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import styles from "./styles.module.scss";
import { Icon } from '../Icon';

// Define the Button type to control the props that can be passed to the Button component.
type Button = {
    // The variant prop is a string that determines the color of the button.
    // It can be one of the following values: 'primary', 'secondary', 'danger', 'warning', 'success', 'info', 'link', or any other string.
    // The default value is 'primary'.
    variant: 'primary' | 'secondary' | 'link';
    
    color: 'indigo' | 'teal' | 'body' | null;
    // The disabled prop is a boolean that determines if the button should be disabled.
    disabled?: boolean;
    leftIcon?: string;
    // The className prop is a string that allows you to add custom classes to the button.
    className?: string;
    // The style prop is an object that allows you to add custom styles to the button.
    style?: CSSProperties;
    // The link prop is a string that determines the URL the button should link to.
    link: string;
    // The label prop is a string that determines the text of the button.
    label: string;
}

// Button component that accepts the specified props.
export default function Button ({ 
    variant = 'primary', 
    disabled = false, 
    color = 'indigo',
    leftIcon,
    className, 
    style, 
    link, 
    label 
}: Button) {
    const colorClass = color ? styles[`button--${color}`] : '';
    const variantClass = variant ? styles[`button--${variant}`] : '';
    const disabledClass = disabled ? styles['disabled'] : '';
    // If the button is disabled, set the destination to null.
    return (
        <Link to={link}>
            <button
                className={clsx(
                    styles['custom-button'],
                    colorClass,
                    variantClass,
                    disabledClass,
                    className
                )}
                style={style}
                role='button'
                aria-disabled={disabled}
            >
                {leftIcon && <Icon className={styles.leftIcon} icon={leftIcon} size='inherit' color='inherit' /> }
                {label}
                {(link || variant == 'link') && <Icon className={styles['fa-arrow-right']} icon='fa-regular fa-arrow-right' size='inherit' color='inherit' /> }
            </button>
        </Link>
    );
}