import React from "react";
import { ResponsiveChild } from "./ResponsiveChild";

interface MenuProps {
    children?: React.ReactNode;
}
export function Operator(props: MenuProps): JSX.Element {
    return (
        <ResponsiveChild
            position="lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-6
                    xl:col-start-5 xl:col-end-7 xl:row-start-1 xl:row-end-6
                    2xl:col-start-5 2xl:col-end-7 2xl:row-start-1 2xl:row-end-6
            "
        >
            {props.children}
        </ResponsiveChild>
    );
}

export function Gacha(props: MenuProps): JSX.Element {
    return (
        <ResponsiveChild
            position="lg:col-start-6 lg:col-end-10 lg:row-start-6 lg:row-end-9
            xl:col-start-6 xl:col-end-10 xl:row-start-6 xl:row-end-9
            2xl:col-start-6 2xl:col-end-10 2xl:row-start-6 2xl:row-end-9
    "
        >
            {props.children}
        </ResponsiveChild>
    );
}

export function Music(props: MenuProps): JSX.Element {
    return (
        <ResponsiveChild
            position="lg:col-start-3 lg:col-end-6 lg:row-start-7 lg:row-end-11
            xl:col-start-3 xl:col-end-6 xl:row-start-7 xl:row-end-11
            2xl:col-start-3 2xl:col-end-6 2xl:row-start-7 2xl:row-end-11
    "
        >
            {props.children}
        </ResponsiveChild>
    );
}

export function Calculation(props: MenuProps): JSX.Element {
    return (
        <ResponsiveChild
            position="lg:col-start-2 lg:col-end-5 lg:row-start-4 lg:row-end-7
            xl:col-start-2 xl:col-end-5 xl:row-start-4 xl:row-end-7
            2xl:col-start-2 2xl:col-end-5 2xl:row-start-4 2xl:row-end-7
    "
        >
            {props.children}
        </ResponsiveChild>
    );
}
