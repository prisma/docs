import clsx from "clsx";
import { CSSProperties } from "react";

import { Icon } from "../Icon";
import styles from "./styles.module.scss";

type BadgeType = {
    // primary variant should be solid all over, secondary variant is border-colored.
    variant: 'primary' | 'secondary';
    color: 'indigo' | 'teal' | 'gray' | null;
    // The disabled prop is a boolean that determines if the button should be disabled.
    disabled?: boolean;
    size?: 'sm' | 'md' | null;
    leftIcon?: string;
    // The className prop is a string that allows you to add custom classes to the button.
    className?: string;
    // The style prop is an object that allows you to add custom styles to the button.
    style?: CSSProperties;
    // The link prop is a string that determines the URL the button should link to.
    link?: string;
    // The label prop is a string that determines the text of the button.
    label: string;
}
export default function Badge ({ 
    variant = 'primary', 
    disabled = false, 
    size = null,
    color = 'indigo',
    leftIcon,
    className, 
    style, 
    link,
    label 
}: BadgeType) {
    const BadgeComp = (props: any) =>
        Boolean(link) ?
            <a href={link} {...props}>{props.children}</a> :
            <span {...props}>{props.children}</span>
    return (
        <BadgeComp style={style} className={clsx(className, styles.badge, styles[variant], styles[`color-${color}`], size && styles[size])}>
            {leftIcon && <Icon className={styles.leftIcon} icon={leftIcon} size='inherit' color='inherit' /> }
            {label}
        </BadgeComp>
    )
};