import React from "react";

interface ComponentProps {
    children?: JSX.Element;
    style?: any;
    className?: string;
    key: string;
}

export const GridItem = React.forwardRef<HTMLDivElement, ComponentProps>(
    ({ style, className, key, children, ...restOfProps }, ref) => {
        return (
            <div
                style={{ ...style }}
                className={["w-full h-full", className].join(" ")}
                key={key}
                {...restOfProps}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);
