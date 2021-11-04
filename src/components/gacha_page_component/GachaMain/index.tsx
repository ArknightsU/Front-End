import { GoBackButton, GoBackLinkButton, useWindowSize } from "@components";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { CharacterPreview } from "../CharacterPreview";
import { PoolGrabber } from "../PoolGrabber/PoolGrabber";
import { GachaBackground } from "./GachaBackground";
import { GachaForeground } from "./GachaForeground";
import { Transition } from "@headlessui/react";
import { GachaDetail } from "../GachaDetail";
import { GachaAnimation } from "../GachaAnimation";
import { HorizontalGoogleAds } from "@components/common/GoogleAds";

interface GachaMainProps {
    pools: Array<any>;
}
const DEV_featured = ["char_1013_chen2", "char_437_mizuki", "char_421_crow"];
export function GachaMain(props: GachaMainProps): JSX.Element {
    const [focused, setFocused] = useState(0);
    const [showGrab, setShowGrab] = useState(false);
    const [poolSelected, setPoolSelected] = useState(false);
    const [doAnimation, setDoAnimation] = useState(false);
    const [gachaData, setGachaData] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const backButtonOnClickHandler = () => {
        setShowGrab(true);
        setPoolSelected(false);
    };
    console.log(props.pools);
    useEffect(() => {
        setShowGrab(true);
    }, []);
    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center overflow-hidden">
            <div className={`absolute w-full h-auto z-50 top-0`}>
                <HorizontalGoogleAds />
            </div>
            {showGrab && !poolSelected ? (
                <GoBackLinkButton top={120} />
            ) : (
                <GoBackButton top={120} onClick={backButtonOnClickHandler} />
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
                <div className="absolute w-screen h-screen flex flex-row justify-center items-center overflow-hidden">
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
                DEV_featured={DEV_featured}
                pools={props.pools}
                focused={focused}
                poolSelected={poolSelected}
            />
            <Transition
                appear={true}
                show={poolSelected}
                as={Fragment}
                unmount={true}
                enter="transition-all top-0 duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all duration-1000"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="absolute w-screen h-screen flex flex-row justify-center items-center overflow-hidden z-20">
                    <GachaDetail
                        poolSelected={poolSelected}
                        pools={props.pools}
                        focused={focused}
                        setDoAnimation={setDoAnimation}
                        setGachaData={setGachaData}
                        setLoading={setLoading}
                        setError={setError}
                    />
                </div>
            </Transition>

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
