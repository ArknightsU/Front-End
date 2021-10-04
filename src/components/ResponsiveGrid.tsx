import React from "react";

interface Props {
    children: React.ReactNode;
}

export function ResponsiveGrid({ children }: Props): JSX.Element {
    return <div>{children}</div>;
}
