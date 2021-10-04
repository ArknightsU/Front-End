import React from "react";

interface Props {
    children: React.ReactNode;
}

export function ResponsiveGrid({ children }: Props): JSX.Element {
    return (
        <div
            className="box-border absolute p-5 grid w-full h-auto grid-cols-1 grid-rows-20percent-14
        sm:w-full sm:h-auto sm:grid-cols-1 sm:grid-rows-20percent-14
        md:w-full md:h-auto md:grid-cols-3 md:grid-rows-20percent-7
        lg:w-full lg:h-full lg:grid-cols-10 lg:grid-rows-10
        xl:w-full xl:h-full xl:grid-cols-10 xl:grid-rows-10
        2xl:w-full 2xl:h-full 2xl:grid-cols-10 2xl:grid-rows-10
        "
        >
            {children}
        </div>
    );
}
