import React, { Children, JSXElementConstructor } from "react";
import { ResponsiveChild } from "./ResponsiveChild";

interface ComponentProps {
    children?: JSX.Element;
    style?: any;
    className?: string;
    key: string;
}
interface MenuProps {
    children?: React.ReactNode;
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

const menuStyle = "absolute bg-transparent w-full h-full p-4";
const insideStlye = "bg-black w-full h-full box-border rounded-lg";

export function Operator(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Gacha(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Calculation(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Music(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Login(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Settings(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Ads(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Dev(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Theme(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Logo(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function AdjustUI(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}
