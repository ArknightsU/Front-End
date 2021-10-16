import React from "react";
import { menuStyle, insideStyle } from "./common";
import { SubMenuComp } from "./SubMenuComp";
import { EditUI } from "@recoil/atoms";
import { useRecoilState } from "recoil";

export function AdjustUI(): JSX.Element {
    const [draggable, setDraggable] = useRecoilState(EditUI);
    const icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-8 lg:w-8"
            viewBox="0 0 20 20"
            fill="#fff"
        >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
            />
        </svg>
    );
    const text = draggable ? "UI 저장" : "UI 고정 해제";
    return (
        <div
            className={menuStyle}
            onClick={() => {
                setDraggable(!draggable);
            }}
        >
            <div className={insideStyle}>
                <SubMenuComp
                    text={text}
                    icon={icon}
                    background="bg-gradient-to-tr from-purple-400 to-purple-200"
                />
            </div>
        </div>
    );
}
