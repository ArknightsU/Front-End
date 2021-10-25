import { GoBackButton, GoBackLinkButton, useWindowSize } from "@components";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { CharacterPreview } from "../CharacterPreview";
import { PoolGrabber } from "../PoolGrabber/PoolGrabber";
import { GachaBackground } from "./GachaBackground";
import { GachaForeground } from "./GachaForeground";
import { Transition } from "@headlessui/react";
import { GachaDetail } from "../GachaDetail";
import { GachaAnimation } from "../GachaAnimation";

interface GachaMainProps {
    pools: Array<any>;
}
export function GachaMain(props: GachaMainProps): JSX.Element {
    const [focused, setFocused] = useState(0);
    const [showGrab, setShowGrab] = useState(false);
    const [poolSelected, setPoolSelected] = useState(false);
    const [doAnimation, setDoAnimation] = useState(false);
    const [gachaData, setGachaData] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const backButtonOnClickHandler = () => {
        if (poolSelected && !showGrab) {
            setShowGrab(true);
            setPoolSelected(false);
        }
    };
    useEffect(() => {
        setShowGrab(true);
    }, []);
    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center overflow-hidden">
            {showGrab && !poolSelected ? (
                <GoBackLinkButton />
            ) : (
                <GoBackButton onClick={backButtonOnClickHandler} />
            )}
            {/* Background Images Start */}
            <GachaBackground />
            {/* Background Images End */}
            <Transition
                appear={true}
                show={showGrab && !poolSelected}
                as={Fragment}
                unmount={true}
                enter="transition-all top-0 duration-1000"
                enterFrom="-left-full"
                enterTo="left-0"
                leave="transition-all duration-1000"
                leaveFrom="left-0"
                leaveTo="-left-full"
            >
                <div className="absolute w-screen h-screen flex flex-row justify-center items-center">
                    <PoolGrabber
                        showGrab={showGrab}
                        pools={props.pools}
                        focused={focused}
                        setFocused={setFocused}
                        setShowGrab={setShowGrab}
                        setPoolSelected={setPoolSelected}
                    />
                </div>
            </Transition>
            <CharacterPreview
                pools={props.pools}
                focused={focused}
                poolSelected={poolSelected}
            />
            <GachaDetail
                poolSelected={poolSelected}
                pools={props.pools}
                focused={focused}
                setDoAnimation={setDoAnimation}
                setGachaData={setGachaData}
                setLoading={setLoading}
                setError={setError}
            />
            {/* Foreground Images Start */}
            <GachaForeground />
            {doAnimation ? (
                <GachaAnimation
                    setGachaData={setGachaData}
                    setDoAnimation={setDoAnimation}
                    gachaData={gachaData}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
