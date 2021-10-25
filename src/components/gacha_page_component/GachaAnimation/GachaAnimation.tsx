import { CustomImage } from "@components/common";
import React from "react";

interface GachaAnimationProps {
    setDoAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    gachaData: Array<string>;
}
export function GachaAnimation({
    setDoAnimation,
    gachaData,
}: GachaAnimationProps): JSX.Element {
    return (
        <div
            className="absolute w-screen h-screen z-animation bg-gachaAnimation bg-no-repeat bg-center"
            style={{ backgroundSize: "cover" }}
        >
            <div></div>
        </div>
    );
}
