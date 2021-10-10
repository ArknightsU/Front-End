import React from "react";
import Image from "next/image";

interface ComponentProps {
    children?: JSX.Element;
    style?: any;
    className?: string;
    key: string;
}

export const GridItem = React.forwardRef<HTMLDivElement, ComponentProps>(
    ({ style, className, key, children, ...restOfProps }, ref) => {
        return (
            <div
                style={{ ...style }}
                className={["w-full h-full", className].join(" ")}
                key={key}
                {...restOfProps}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

const menuStyle = "absolute bg-transparent w-full h-full p-4 cursor-pointer";
const insideStlye =
    "bg-gray-100 w-full h-full box-border rounded-lg flex flex-col justify-center items-center shadow-md";

export function Operator(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

const gachaStyle =
    "relative bg-gradient-to-b from-gray-100 via-red-200 to-red-600 w-full h-full box-border rounded-lg flex flex-col justify-center items-center shadow-md";
export function Gacha(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={gachaStyle}>
                <div className="absolute w-full h-full bg-gradient-to-b rounded-lg from-red-500 to-red-900 opacity-0 hover:opacity-100 transition-all duration-1000"></div>
                <div className="h-3/5 w-full relative drop-shadow-lg pointer-events-none">
                    <Image
                        src="/img/items/DIAMOND_SHD.webp"
                        alt="gacha"
                        layout="fill"
                        objectFit="contain"
                    ></Image>
                </div>
                <span
                    className="h-1/5 w-full relative text-center align-middle font-sans font-semibold antialiased text-white flex flex-col justify-end
                    text-xl lg:text-xl xl:text-2xl"
                >
                    {"가챠 시뮬레이션"}
                </span>
            </div>
        </div>
    );
}

export function Calculation(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Music(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Login(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Settings(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Ads(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Dev(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function Theme(): JSX.Element {
    const [theme, setTheme] = React.useState("light");
    React.useEffect(() => {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, [theme]);
    return (
        <div
            className={menuStyle}
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
            }}
        >
            <div className={insideStlye}></div>
        </div>
    );
}

export function Logo(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}

export function AdjustUI(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStlye}></div>
        </div>
    );
}
