import React from "react";
import { menuStyle, insideStyle } from "./common";

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
            <div className={insideStyle}></div>
        </div>
    );
}
