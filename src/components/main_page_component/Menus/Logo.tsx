import React from "react";
import { menuStyle, insideStyle } from "./common";

export function Logo(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStyle}></div>
        </div>
    );
}
