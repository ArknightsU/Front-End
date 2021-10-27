import React from "react";

export function EclipseSpinner(): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
                background: "none",
                display: "block",
                shapeRendering: "auto",
            }}
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <path
                d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                fill="#df1317"
                stroke="none"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 51;360 50 51"
                ></animateTransform>
            </path>
        </svg>
    );
}
