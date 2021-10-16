import React from "react";
import { menuStyle } from "./common";
import { StarRating } from "../../common/StarRating";
import { Carousel } from "@components/common";
import { useInterval } from "react-use";
import { getCharacterObject } from "@components/common/CharacterTableProcess";

const IMAGE_DIR = "/img/characters/";
const FILE_NAME_POST_FIX = "_2.webp";
export function Operator(): JSX.Element {
    const op = ["char_440_pinecn", "char_365_aprl", "char_400_weedy"];
    const images = op.map((x) => IMAGE_DIR + x + FILE_NAME_POST_FIX);
    const names = op.map((x) => {
        return getCharacterObject(x)["kr_name"];
    });
    const titles = [
        "일반 환경 성능지수 TOP",
        "외모 TOP",
        "제한된 환경 성능지수 TOP",
    ];
    const ref = React.useRef<HTMLDivElement>(null);
    const rating = [4.3, 3.1, 5];
    const [count, setCount] = React.useState(0);
    const [hover, setHover] = React.useState(false);
    console.log(count);
    useInterval(
        () => {
            setCount((count + 1) % images.length);
        },
        hover ? null : 6000,
    );
    return (
        <div className={menuStyle}>
            <div className="relative bg-gray-100 dark:bg-gray-700 w-full h-full box-border rounded-lg flex flex-col justify-end items-center shadow-md overflow-hidden">
                {/**
                 * Top side blacked content
                 */}
                <div className="h-1/2 w-full absolute top-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
                <div className="h-1/2 w-full absolute top-0 flex flex-col justify-start pt-3">
                    <span className="flex flex-col justify-center w-full h-1/5 text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased z-10">
                        {titles[count]}
                    </span>
                    <div className="w-full z-10 flex flex-row items-center justify-center">
                        <StarRating
                            readOnly={true}
                            initialRating={rating[count]}
                        ></StarRating>
                        <span className="flex flex-col justify-center text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased ml-2">
                            {rating[count]}
                        </span>
                    </div>
                </div>
                {/**
                 * Operator Spinner
                 */}
                <div
                    ref={ref}
                    className="relative w-full h-1/2 lg:h-2/3 transition-transform transform duration-500 hover:scale-150"
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    <Carousel
                        currentIndex={count}
                        parent={ref}
                        images={images}
                        onHoverStop={true}
                    />
                </div>
                {/**
                 * Operator Bottom Line
                 */}
                <div className="h-1/3 lg:h-1/5 w-full bg-blue-400 flex flex-col">
                    <div className="h-2/5 w-full bg-gray-600 flex flex-row">
                        <span className="flex flex-col justify-center w-full h-full text-center text-white text-lg lg:text-lx font-sans font-semibold antialiased z-10">
                            {names[count]}
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
