import { Icon } from "../Icon"

const Headline = ({ component, children }) => {
    const Component = component;
    return <Component>{children}</Component>;
};

export const IconTitle = ({ heading, icon, iconColor, children}: { heading: string, icon: string, iconColor: string, children: any}) => {
    return (
        <Headline component={heading}>
            <Icon icon={icon} btn="left" size="inherit" color={iconColor}/>
            {children}
        </Headline>
    )
}
 
