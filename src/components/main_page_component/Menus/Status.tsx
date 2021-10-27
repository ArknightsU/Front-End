import React from "react";
import { menuStyle, insideStyle } from "./common";

export function Status(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>{"서버상태"}</div>
        </div>
    );
}
