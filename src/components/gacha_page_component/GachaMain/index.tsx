import { useWindowSize } from "@components";
import React, { useRef } from "react";
import { CharacterPreview } from "./CharacterPreview";
import { PoolGrabber } from "./PoolGrabber";
import Image from "next/image";
import { CustomImage } from "@components/common/CustomImage";
import { PoolComponent } from "./PoolComponent";
import { GachaBackground } from "./GachaBackground";

interface GachaMainProps {
    pools: any;
}
export function GachaMain(props: GachaMainProps): JSX.Element {
    const size = useWindowSize();
    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center">
            {/* Background Images Start */}
            <GachaBackground />
            {/* Background Images End */}
            <PoolComponent pool={props.pools[3]} />
            <PoolGrabber pools={props.pools} />
            <CharacterPreview />
            {/* Foreground Images Start */}
            <div className="absolute w-full h-full pointer-events-none">
                <CustomImage src="/ui/black_border.webp" type="stretch" />
            </div>
        </div>
    );
}
