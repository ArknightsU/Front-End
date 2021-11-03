import { HorizontalGoogleAds } from "@components/common/GoogleAds";
import React, { useRef, useState } from "react";
import { useCharFilterArray } from "@components/common/LocalForge";
import { RARITY, PROFESSION } from "@constants";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { useWindowSize } from "@components/hooks/useWindowSize";
import { CharSelector } from "./CharSelecter";
import { Calculator } from "./Calculator/Calculator";
import { GoBackLinkButton, MaterialCalculation } from "@components/common";

export function CalcMain(): JSX.Element {
    // State: rarity filter array
    const [rarity, setRarity] = useState<Array<string>>([RARITY.six]);
    // State: profession filter array
    const [profession, setProfession] = useState<Array<string>>([
        PROFESSION.warrior,
    ]);
    // State: selected characters array
    const [focused, setFocused] = useState<Array<MaterialCalculation>>([]);
    const [charNameArray, Loading] = useCharFilterArray(rarity, profession);
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
                className="w-full absolute overflow-hidden pb-10 z-10"
                style={{
                    height: `calc(100% - ${
                        ads.current ? ads.current.offsetHeight : 0
                    }px)`,
                    top: `${ads.current ? ads.current.offsetHeight : 0}px`,
                }}
            >
                <GoBackLinkButton
                    zIndex={9}
                    top={20}
                    left={window_size.width < 768 ? 10 : 40}
                />
                <CharSelector
                    rarity={rarity}
                    setRarity={setRarity}
                    profession={profession}
                    setProfession={setProfession}
                    charNameArray={charNameArray}
                    focused={focused}
                    setFocused={setFocused}
                />
                <Calculator focused={focused} setFocused={setFocused} />
            </div>
        </div>
    );
}
