import { Icon } from "../Icon"

const Headline = ({ component, children, style }) => {
    const Component = component;
    return <Component style={style}>{children}</Component>;
};

export const IconTitle = ({ heading, icon, iconColor, children}: { heading: string, icon: string, iconColor: string, children: any}) => {
    return (
        <Headline component={heading} style={{ paddingTop: `24px` }}>
            <Icon icon={icon} btn="left" size="inherit" color={iconColor}/>
            {children}
        </Headline>
    )
}
