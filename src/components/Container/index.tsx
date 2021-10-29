import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    padding?: boolean;
}

// full size container for viewport
// controls darkmode
export function Container({ children, padding }: ContainerProps): JSX.Element {
    return (
        <div
            className={`min-h-screen min-w-screen flex flex-col bg-white dark:bg-gray-900 ${
                padding ? "p-5" : ""
            } overflow-hidden`}
        >
            {children}
        </div>
    );
}
