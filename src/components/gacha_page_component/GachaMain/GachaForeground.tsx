import { CustomImage } from "@components/common";
import React from "react";

export function GachaForeground(): JSX.Element {
    return (
        <div className="absolute w-full h-full pointer-events-none">
            <CustomImage src="/ui/black_border.webp" type="stretch" />
        </div>
    );
}
