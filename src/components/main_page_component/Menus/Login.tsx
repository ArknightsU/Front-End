import React from "react";
import { menuStyle, insideStyle } from "./common";
import { SubMenuComp } from "./SubMenuComp";

export function Login(): JSX.Element {
    const icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-8 lg:w-8"
            viewBox="0 0 20 20"
            fill="#fff"
        >
            <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
            />
        </svg>
    );
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>
                <SubMenuComp
                    text={"로그인"}
                    background="bg-gray-500"
                    icon={icon}
                />
            </div>
        </div>
    );
}
