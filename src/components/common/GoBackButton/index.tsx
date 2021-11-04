import Link from "next/link";
import React, { MouseEventHandler } from "react";

// Goback NEXT-Linked button
interface GoBackLinkButtonProps {
    href?: string;
    zIndex?: number;
    top?: number;
    left?: number;
}
export function GoBackLinkButton(props: GoBackLinkButtonProps): JSX.Element {
    return (
        <Link href={props.href ? props.href : "/"} passHref>
            <div
                className="absolute top-10 left-10 w-20 h-14 md:w-44 md:h-14 bg-truegray-700 bg-opacity-100 opacity-100 shadow-xl"
                style={{
                    zIndex: props.zIndex ? props.zIndex : 50,
                    top: props.top ? `${props.top}px` : "40px",
                    left: props.left ? `${props.left}px` : "40px",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                    viewBox="0 0 20 20"
                    fill="#fff"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </Link>
    );
}

// Goback Normal Button w/ onclick event handler
interface GoBackButtonProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    zIndex?: number;
    top?: number;
    left?: number;
}
export function GoBackButton(props: GoBackButtonProps): JSX.Element {
    return (
        <div
            className="absolute top-10 left-10 w-20 h-14 md:w-44 md:h-14 bg-truegray-700 bg-opacity-100 opacity-100 z-50 shadow-xl"
            onClick={props.onClick}
            style={{
                zIndex: props.zIndex ? props.zIndex : 50,
                top: props.top ? `${props.top}px` : "40px",
                left: props.left ? `${props.left}px` : "40px",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto"
                viewBox="0 0 20 20"
                fill="#fff"
            >
                <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
