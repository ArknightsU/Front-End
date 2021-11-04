import { CustomImage } from "@components";
import React from "react";

export function GachaBackground(): JSX.Element {
    return (
        <div className="w-full h-full absolute  flex justify-center items-center z-0 overflow-hidden">
            <CustomImage type="stretch" src="/ui/gacha_bg.webp" />
        </div>
    );
}
