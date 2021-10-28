import { HorizontalGoogleAds } from "@components/common/GoogleAds";
import React, { useRef, useState } from "react";
import { useCharFilterArray } from "@components/common/LocalForge";
import { RARITY, PROFESSION } from "@constants";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { useWindowSize } from "@components/hooks/useWindowSize";
import { Scrollbars } from "react-custom-scrollbars-2";
import { CharSelector } from "./CharSelecter";

export function CalcMain(): JSX.Element {
    const [rarity, setRarity] = useState<Array<string>>([RARITY.six]);
    const [profession, setProfession] = useState<Array<string>>([
        PROFESSION.warrior,
    ]);
    const [focused, setFocused] = useState<Array<string>>([]);
    console.log(focused);
    const [charNameArray, Loading] = useCharFilterArray(rarity, profession);
    console.log(charNameArray);
    console.log(Loading);
    // get ads' height and calculate main component
    const ads = useRef<HTMLDivElement>(null);
    const window_size = useWindowSize();
    return (
        <div className="w-screen h-screen relative flex flex-col">
            {/* Google Ads */}
            <div ref={ads} className="w-full h-auto absolute top-0 z-70">
                <HorizontalGoogleAds />
            </div>
            {/* Loading Component Start */}
            {Loading ? (
                <div className="w-full h-full absolute top-0 flex justify-center items-center backdrop-filter backdrop-blur-lg z-animation">
                    <div
                        className="flex flex-col p-5 bg-white dark:bg-gray-800 rounded-lg drop-shadow-bottom justify-center items-center"
                        style={{
                            width: window_size.width / 3,
                            height: window_size.width / 3,
                        }}
                    >
                        <EclipseSpinner />
                        <span className="text-lg md:text-xl text-black dark:text-white font-bold flex justify-center items-center">
                            {"오퍼레이터 정보를 불러오는 중"}
                        </span>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {/* Loading Component End */}
            <div
                className="w-full absolute bg-black overflow-hidden"
                style={{
                    height: `calc(100% - ${
                        ads.current ? ads.current.offsetHeight : 0
                    }px)`,
                    top: `${ads.current ? ads.current.offsetHeight : 0}px`,
                }}
            >
                <CharSelector
                    rarity={rarity}
                    setRarity={setRarity}
                    profession={profession}
                    setProfession={setProfession}
                    charNameArray={charNameArray}
                    focused={focused}
                    setFocused={setFocused}
                />
            </div>
        </div>
    );
}
