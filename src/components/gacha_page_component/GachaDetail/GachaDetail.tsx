import { Transition } from "@headlessui/react";
import React from "react";
import { HorizontalGoogleAds } from "@components/common/GoogleAds/HorizontalGoogleAds";
import { CustomImage } from "@components/common";
import { DetailChildLayout } from "./DetailChildLayout";

interface GachaDetailProps {
    poolSelected: boolean;
    focused: number;
    pools: Array<any>;
}
export function GachaDetail(props: GachaDetailProps): JSX.Element {
    return (
        <div className="absolute w-screen h-screen flex flex-row justify-center items-center overflow-hidden">
            <div
                className={`w-11/12 h-full md:w-1/2 absolute transition-all duration-1000 z-40 flex flex-col items-start  pt-12 ${
                    props.poolSelected
                        ? "right-6 lg:right-12 xl:right-24"
                        : "-right-full"
                }  bg-green-500`}
            >
                <div className={`w-full h-auto z-50 bg-yellow-500`}>
                    <HorizontalGoogleAds />
                </div>
                <div className="w-full h-auto transition-all mt-4 duration-1000 z-40 bg-red-500 flex flex-col">
                    {/* Orundum, Originite Status Start */}
                    <div className="w-full h-18 md:h-28 flex flex-row justify-evenly items-center mt-8">
                        <div className="h-18 md:h-28 w-44 md:w-60 bg-white bg-opacity-80 relative rounded-xl overflow-hidden flex flex-row drop-shadow-bottom">
                            <div className="h-full w-full top-0 left-16 md:top-8 md:left-20 bg-orundum bg-no-repeat bg-opacity-50 filter blur absolute bg-top bg-contain"></div>
                            <div className="h-full w-1/4 bg-truegray-800 flex flex-col justify-center items-center">
                                {/*
                                <span className="w-full text-white font-bold flex justify-center items-center">
                                    {"사용한\n합성옥"}
                                </span>*/}
                                <span className="font-bold text-white text-sm md:text-lg">
                                    {"USED"}
                                </span>
                                <div className="w-8 h-8 md:w-14 md:h-14">
                                    <CustomImage src="/img/items/mini/redgem.webp" />
                                </div>
                            </div>
                            <div className="h-full w-3/4 flex justify-center items-center">
                                <span className="font-bold text-black text-3xl">
                                    {"0"}
                                </span>
                            </div>
                        </div>
                        <div className="h-18 md:h-28 w-44 md:w-60 bg-white bg-opacity-80 relative rounded-xl overflow-hidden flex flex-row drop-shadow-bottom">
                            <div className="h-full w-full top-0 left-16 md:top-8 md:left-20 bg-originite bg-no-repeat bg-opacity-50 filter blur absolute bg-top bg-contain"></div>
                            <div className="h-full w-1/4 bg-truegray-800 flex flex-col justify-center items-center">
                                {/*
                                <span className="w-full text-white font-bold flex justify-center items-center">
                                    {"사용한\n합성옥"}
                                </span>*/}
                                <span className="font-bold text-white text-sm md:text-lg">
                                    {"USED"}
                                </span>
                                <div className="w-8 h-8 md:w-14 md:h-14">
                                    <CustomImage src="/img/items/mini/puregem.webp" />
                                </div>
                            </div>
                            <div className="h-full w-3/4 flex justify-center items-center">
                                <span className="font-bold text-black text-3xl">
                                    {"0"}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Orundum, Originite Status End */}
                    {/* Button Area Start */}
                    <div className="w-full h-24 flex flex-row justify-center items-center mt-8">
                        <div className="h-full w-48">
                            <CustomImage src="/ui/UI_GACHA_POOL_ONE_DRAW.webp" />
                        </div>
                        <div className="h-full w-48">
                            <CustomImage src="/ui/UI_GACHA_POOL_TEN_DRAW.webp" />
                        </div>
                    </div>
                    {/* Button Area End */}
                    <DetailChildLayout></DetailChildLayout>
                </div>
            </div>
        </div>
    );
}
