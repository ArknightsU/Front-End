import Link from "next/link";
import React, { DOMAttributes, MouseEventHandler } from "react";

export function GoBackLinkButton(): JSX.Element {
    return (
        <Link href="/" passHref>
            <div className="absolute top-10 left-10 w-44 h-14 bg-truegray-700 bg-opacity-100 opacity-100 z-50 shadow-xl">
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

interface GoBackButtonProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
}
export function GoBackButton(props: GoBackButtonProps): JSX.Element {
    return (
        <div
            className="absolute top-10 left-10 w-44 h-14 bg-truegray-700 bg-opacity-100 opacity-100 z-50 shadow-xl"
            onClick={props.onClick}
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
