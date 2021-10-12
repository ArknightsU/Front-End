import React from "react";
import Image from "next/image";
import { StarRating } from "../StarRating";

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
    "bg-gray-100 dark:bg-gray-800 w-full h-full box-border rounded-lg flex flex-col justify-center items-center shadow-md";

export function Operator(): JSX.Element {
    const rating = 4.3;
    return (
        <div className={menuStyle}>
            <div className="relative bg-gray-100 w-full h-full box-border rounded-lg flex flex-col justify-end items-center shadow-md overflow-hidden">
                {/**
                 * Top side blacked content
                 */}
                <div className="h-1/2 w-full absolute top-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
                <div className="h-1/2 w-full absolute top-0 flex flex-col justify-start pt-3">
                    <span className="flex flex-col justify-center w-full h-1/5 text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased z-10">
                        {"제한된 환경 성능지수 TOP"}
                    </span>
                    <div className="w-full z-10 flex flex-row items-center justify-center">
                        <StarRating
                            readOnly={true}
                            initialRating={rating}
                        ></StarRating>
                        <span className="flex flex-col justify-center text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased ml-2">
                            {rating}
                        </span>
                    </div>
                </div>
                {/**
                 * Operator Spinner
                 */}
                <div className="relative w-full h-1/2 lg:h-2/3 transition-transform transform duration-500 hover:scale-150">
                    <Image
                        src="/img/characters/char_440_pinecn_2.webp"
                        alt="chara"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                {/**
                 * Operator Bottom Line
                 */}
                <div className="h-1/3 lg:h-1/5 w-full bg-blue-400 flex flex-col">
                    <div className="h-2/5 w-full bg-gray-600 flex flex-row">
                        <span className="flex flex-col justify-center w-full h-full text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased z-10">
                            {"파인콘"}
                        </span>
                    </div>
                    <div className="h-3/5 w-full">
                        <span className="flex flex-col justify-center w-full h-full text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased ">
                            {"오퍼레이터"}
                        </span>
                    </div>
                </div>
            </div>
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
    const items = [
        "/img/items/MTL_SL_PP.webp",
        "/img/items/MTL_SL_PLCF.webp",
        "/img/items/MTL_SL_OEU.webp",
        "/img/items/MTL_SL_DS.webp",
        "/img/items/MTL_SL_BN.webp",
    ];
    const center = "relative h-full w-1/4 flex justify-center items-center";
    return (
        <div className={menuStyle}>
            <div className={insideStlye}>
                <div className="relative h-full w-full rounded-lg bg-gradient-to-t from-green-600 via-green-200 to-green-500 flex justify-center items-center">
                    <div className="relative h-2/5 w-full flex flex-row justify-between items-center pr-2 pl-2">
                        {items.map((item) => (
                            <div
                                className={
                                    item === "/img/items/MTL_SL_OEU.webp"
                                        ? center
                                        : "relative h-full w-1/6 flex justify-center items-center"
                                }
                            >
                                <Image
                                    src={item}
                                    alt="items"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <span
                    className="h-1/5 w-full absolute bottom-3 text-center align-middle font-sans font-semibold antialiased text-white flex flex-col justify-center
                    text-xl lg:text-xl xl:text-2xl"
                >
                    {"재료 계산"}
                </span>
            </div>
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
            <div className={insideStlye}>
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
    const [drag, setDrag] = React.useState(false);
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
                if (drag) setTheme(theme === "light" ? "dark" : "light");
                else return;
            }}
            onDragStart={() => {
                setDrag(true);
            }}
            onDragEnd={() => {
                setDrag(false);
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
