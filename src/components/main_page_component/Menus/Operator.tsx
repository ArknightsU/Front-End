import React from "react";
import { menuStyle } from "./common";
import { StarRating } from "@components/StarRating";
import Image from "next/image";

export function Operator(): JSX.Element {
    const rating = 4.3;
    return (
        <div className={menuStyle}>
            <div className="relative bg-gray-100 w-full h-full box-border rounded-lg flex flex-col justify-end items-center shadow-md overflow-hidden">
                {/**
                 * Top side blacked content
                 */}
                <div className="h-1/2 w-full absolute top-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
                <div className="h-1/2 w-full absolute top-0 flex flex-col justify-start pt-3">
                    <span className="flex flex-col justify-center w-full h-1/5 text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased z-10">
                        {"제한된 환경 성능지수 TOP"}
                    </span>
                    <div className="w-full z-10 flex flex-row items-center justify-center">
                        <StarRating
                            readOnly={true}
                            initialRating={rating}
                        ></StarRating>
                        <span className="flex flex-col justify-center text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased ml-2">
                            {rating}
                        </span>
                    </div>
                </div>
                {/**
                 * Operator Spinner
                 */}
                <div className="relative w-full h-1/2 lg:h-2/3 transition-transform transform duration-500 hover:scale-150">
                    <Image
                        src="/img/characters/char_440_pinecn_2.webp"
                        alt="chara"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                {/**
                 * Operator Bottom Line
                 */}
                <div className="h-1/3 lg:h-1/5 w-full bg-blue-400 flex flex-col">
                    <div className="h-2/5 w-full bg-gray-600 flex flex-row">
                        <span className="flex flex-col justify-center w-full h-full text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased z-10">
                            {"파인콘"}
                        </span>
                    </div>
                    <div className="h-3/5 w-full">
                        <span className="flex flex-col justify-center w-full h-full text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased ">
                            {"오퍼레이터"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
