import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
    return (
        <div className="min-h-screen min-w-screen flex flex-col bg-white p-5 overflow-hidden">
            {children}
        </div>
    );
}
