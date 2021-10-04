import React from "react";
import { Positions } from "./ResponsiveChildPosition";

interface ResponsiveChildProps {
    children?: React.ReactNode | undefined;
    position?: string | undefined;
}

export function ResponsiveChild(props: ResponsiveChildProps): JSX.Element {
    const position: string = props.position === undefined ? "" : props.position;
    return (
        <div
            className={
                "bg-white flex flex-col box-border m-4 rounded-lg " + position
            }
        >
            {props.children}
        </div>
    );
}
