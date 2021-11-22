import { useState } from "react";
import { CustomImage, useWindowSize } from "..";
import { SettingsBody } from "./SettingsBody";
import { SettingsHeader } from "./SettingsHeader";

export function SettingsMain(): JSX.Element {
    const [current, setCurrent] = useState(0);
    const window_size = useWindowSize();
    return (
        <div className="w-screen h-screen absolute top-0 left-0 font-ibm-korean text-truegray-700 dark:text-white overflow-hidden">
            <div className="w-full h-full absolute filter dark:invert">
                <CustomImage src="/ui/bg_prts.webp" type="stretch" />
            </div>
            <div className="relative w-full h-full p-6 md:p-24 flex flex-col justify-staart items-center gap-x-5">
                <div className="w-full md:w-4/5 h-24 z-10 mb-5">
                    <SettingsHeader />
                </div>
                <div
                    className="w-full md:w-4/5 z-10"
                    style={{ height: "calc(100% - 116px)" }}
                >
                    <SettingsBody current={current} setCurrent={setCurrent} />
                </div>
            </div>
        </div>
    );
}
