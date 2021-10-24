import React from "react";

interface LayoutType {
    children?: React.ReactNode;
}
export function DetailChildLayout({ children }: LayoutType): JSX.Element {
    return <div className="">{children}</div>;
}
