import React from "react";

export function GachaBackground(): JSX.Element {
    return (
        <div className="w-full h-full absolute  bg-gray-200 bg-repeat bg-bricks bg-gacha-mask bg-blend-darken opacity-40 flex justify-center items-center z-0">
            <div className="relative w-full h-full rounded-full blur-3xl flex justify-center items-center">
                <div className="relative w-1/3 h-2/3 rounded-full bg-gray-200 blur-3xl"></div>
            </div>
        </div>
    );
}
