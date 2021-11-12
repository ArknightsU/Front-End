import React from "react";

interface SubMenuProps {
    background?: string;
    text: string;
    icon?: React.SVGProps<SVGSVGElement>;
}
const DEFAULT_ICON = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 md:h-8 md:w-8"
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
const DEFAULT_BG = "bg-gray-500";
export function SubMenuComp(props: SubMenuProps): JSX.Element {
    return (
        <div className="w-full h-full relative p-1 md:p-4 box-border flex flex-col justify-center items-center">
            <div className="flex flex-col">
                <div
                    className={`${
                        props.background ? props.background : DEFAULT_BG
                    } relative p-2 md:p-4 rounded-full flex justify-center items-center`}
                >
                    {props.icon ? props.icon : DEFAULT_ICON}
                </div>
            </div>
            <span
                className="w-full bottom-3 text-center align-middle font-ibm-korean antialiased text-gray-600 dark:text-white flex flex-col justify-center
                    text-md lg:text-lg xl:text-xl mt-3 font-extrabold "
            >
                {props.text}
            </span>
        </div>
    );
}
/*
<React.Fragment>
    <div
        className={
            "relative p-4 rounded-full flex justify-center items-center " +
            props.background
                ? props.background
                : DEFAULT_BG
        }
    >
        {props.icon ? props.icon : DEFAULT_ICON}
    </div>
    <span
        className="w-full bottom-3 text-center align-middle font-sans font-semibold antialiased text-gray-600 dark:text-white flex flex-col justify-center
                    text-lg lg:text-lg xl:text-xl mt-3"
    >
        {props.text}
    </span>
</React.Fragment>;
*/
