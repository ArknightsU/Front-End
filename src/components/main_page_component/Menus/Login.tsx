import React from "react";
import { menuStyle, insideStyle } from "./common";

export function Login(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>
                <div className="relative p-4 rounded-full bg-gray-500 flex justify-center items-center">
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
                </div>
                <span
                    className="w-full bottom-3 text-center align-middle font-sans font-semibold antialiased text-gray-600 dark:text-white flex flex-col justify-center
                    text-lg lg:text-lg xl:text-xl mt-3"
                >
                    {"로그인"}
                </span>
            </div>
        </div>
    );
}
