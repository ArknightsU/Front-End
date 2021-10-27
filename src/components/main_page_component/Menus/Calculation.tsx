import React from "react";
import { menuStyle, insideStyle } from "./common";
import Image from "next/image";
import Link from "next/link";

export function Calculation(): JSX.Element {
    const items = [
        "/img/items/MTL_SL_PP.webp",
        "/img/items/MTL_SL_PLCF.webp",
        "/img/items/MTL_SL_OEU.webp",
        "/img/items/MTL_SL_DS.webp",
        "/img/items/MTL_SL_BN.webp",
    ];
    const center =
        "relative h-full w-1/4 flex justify-center items-center overflow-visible";
    return (
        <div className={menuStyle}>
            <Link href="/calc" passHref>
                <div className={insideStyle}>
                    <div className="relative h-full w-full rounded-lg bg-green-500 flex justify-center items-center">
                        <div className="absolute w-full h-1/5 bg-yellow-300"></div>
                        <div className="relative h-2/5 w-full flex flex-row justify-between items-center pr-2 pl-2 overflow-visible">
                            {
                                // Mapping Menu item images
                            }
                            {items.map((item) => (
                                <div
                                    key={item.split("/").pop()}
                                    className={
                                        item === "/img/items/MTL_SL_OEU.webp"
                                            ? center
                                            : "relative h-full w-1/6 flex justify-center items-center"
                                    }
                                >
                                    {/**
                                     *  Calculator Menu Image Items
                                     *  If middle : bigger image & have background
                                     */}
                                    {item === "/img/items/MTL_SL_OEU.webp" ? (
                                        <div className="relative w-full h-full transform scale-130">
                                            <Image
                                                src="/img/material/bg/item-5.webp"
                                                alt="items"
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                    ) : (
                                        React.Fragment
                                    )}
                                    <Image
                                        src={item}
                                        alt="items"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <span
                        className="h-1/5 w-full absolute bottom-3 text-center align-middle font-sans font-semibold antialiased text-white flex flex-col justify-center
                    text-xl lg:text-xl xl:text-2xl"
                    >
                        {"재료 계산"}
                    </span>
                </div>
            </Link>
        </div>
    );
}
