import React from "react";
import { menuStyle, insideStyle } from "./common";
import { SubMenuComp } from "./SubMenuComp";

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
    const dark_icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-8 lg:w-8"
            viewBox="0 0 20 20"
            fill="#f0c420"
        >
            <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
            />
        </svg>
    );
    const light_icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-8 lg:w-8"
            viewBox="0 0 20 20"
            fill="#f0c420"
        >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
    );
    const icon = theme === "light" ? light_icon : dark_icon;
    const light_background = "bg-gradient-to-tr from-gray-800 to-gray-600";
    const dark_background = "bg-gradient-to-tr from-gray-100 to-white";
    const background = theme === "light" ? light_background : dark_background;
    return (
        <div
            className={menuStyle}
            onClick={() => {
                if (!drag) setTheme(theme === "light" ? "dark" : "light");
                else return;
            }}
            onDragStart={() => {
                setDrag(true);
            }}
            onDragEnd={() => {
                setDrag(false);
            }}
        >
            <div className={insideStyle}>
                <SubMenuComp
                    icon={icon}
                    text={"테마 변경"}
                    background={background}
                />
            </div>
        </div>
    );
}
