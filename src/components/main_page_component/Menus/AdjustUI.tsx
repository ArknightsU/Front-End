import React from "react";
import { menuStyle, insideStyle } from "./common";

export function AdjustUI(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStyle}></div>
        </div>
    );
}
