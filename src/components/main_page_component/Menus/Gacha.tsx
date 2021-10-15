import React from "react";
import { menuStyle } from "./common";
import Image from "next/image";

const gachaStyle =
    "relative bg-gradient-to-b from-gray-100 via-red-200 to-red-600 w-full h-full box-border rounded-lg flex flex-col justify-center items-center shadow-md";
export function Gacha(): JSX.Element {
    return (
        <div className={menuStyle}>
            <div className={gachaStyle}>
                <div className="absolute w-full h-full bg-gradient-to-b rounded-lg from-red-500 to-red-900 opacity-0 hover:opacity-100 transition-all duration-1000"></div>
                <div className="h-3/5 w-full relative drop-shadow-lg pointer-events-none">
                    <Image
                        src="/img/items/DIAMOND_SHD.webp"
                        alt="gacha"
                        layout="fill"
                        objectFit="contain"
                    ></Image>
                </div>
                <span
                    className="h-1/5 w-full relative text-center align-middle font-sans font-semibold antialiased text-white flex flex-col justify-end
                    text-xl lg:text-xl xl:text-2xl"
                >
                    {"가챠 시뮬레이션"}
                </span>
            </div>
        </div>
    );
}
