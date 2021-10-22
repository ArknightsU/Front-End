import { useWindowSize } from "@components";
import React, { useRef } from "react";
import { CharacterPreview } from "./CharacterPreview";
import { PoolGrabber } from "./PoolGrabber";
import Image from "next/image";
import { CustomImage } from "@components/common/CustomImage";
import { PoolComponent } from "./PoolComponent";
import { GachaBackground } from "./GachaBackground";
import { GachaForeground } from "./GachaForeground";

interface GachaMainProps {
    pools: Array<any>;
}
export function GachaMain(props: GachaMainProps): JSX.Element {
    const size = useWindowSize();
    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center">
            {/* Background Images Start */}
            <GachaBackground />
            {/* Background Images End */}
            <PoolGrabber pools={props.pools} />
            <CharacterPreview />
            {/* Foreground Images Start */}
            <GachaForeground />
        </div>
    );
}
