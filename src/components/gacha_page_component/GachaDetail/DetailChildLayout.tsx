import React, { useState } from "react";

interface LayoutType {
    initial?: boolean;
    title?: string;
    children?: React.ReactNode;
}
export function DetailChildLayout({
    children,
    initial = false,
    title = "SET TITLE",
}: LayoutType): JSX.Element {
    const [open, setOpen] = useState(initial);
    return (
        <div className="w-full h-auto flex flex-col">
            <div
                className="w-full h-12 md:h-16 bg-truegray-700 flex flex-col justify-center text-center relative rounded-lg"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <span className="ml-5 h-auto w-auto font-ibm-korean text-white text-xl md:text-2xl font-bold flex flex-row item-center">
                    {title}
                </span>
                <div className="absolute w-auto h-full pt-2 pb-2 right-4 transition-all duration-1000">
                    <Arrow open={open} />
                </div>
            </div>
            <div
                className={`w-full transition-all duration-700 bg-white backdrop-filter backdrop-blur-md bg-opacity-60 rounded-lg ${
                    open ? "h-auto p-4" : "h-0 p-0"
                }`}
            >
                {open ? children : <></>}
            </div>
        </div>
    );
}

interface ArrowProps {
    open: boolean;
}
const Arrow: React.FC<ArrowProps> = ({ open }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-auto transition-all"
            viewBox="0 0 20 20"
            fill="#fff"
        >
            {open ? (
                <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                />
            ) : (
                <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            )}
        </svg>
    );
};
