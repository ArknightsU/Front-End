import { useWindowSize } from "@components";
import React from "react";
import { CharacterPreview } from "./CharacterPreview";
import { PoolGrabber } from "./PoolGrabber";

interface GachaMainProps {
    pools: any;
}
export function GachaMain(props: GachaMainProps): JSX.Element {
    const size = useWindowSize();

    return (
        <div
            className="w-screen h-screen flex flex-row justify-center items-center shadow-inner bg-gray-300">
            <div className="absolute bg-gradient-to-r from-black to-transparent opacity-50 h-full w-1/2 left-0"></div>
            <PoolGrabber pools={props.pools} />
            <CharacterPreview />
        </div>
    );
}
