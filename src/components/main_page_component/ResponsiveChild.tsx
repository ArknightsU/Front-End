import React from "react";

interface ResponsiveChildProps {
    className?: string;
    children?: React.ReactNode;
}

export function ResponsiveChild(props: ResponsiveChildProps): JSX.Element {
    return (
        <div
            className={
                "bg-white w-full h-full box-border m-4 rounded-lg " +
                props.className
                    ? props.className
                    : ""
            }
        >
            {props.children ? props.children : ""}
        </div>
    );
}
