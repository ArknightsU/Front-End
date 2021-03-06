import React, { useRef } from "react";
import { CustomImage } from "@components/common";
import { useCharObject } from "@components";
import { getAllfeaturedCharacters } from "../getAllfeaturedCharacters";

interface PoolCompProps {
    pool: any;
    focused: number;
    index: number;
}
export function PoolComponent(props: PoolCompProps): JSX.Element {
    /*
    const DEV_featured = [
        "char_1013_chen2",
        "char_437_mizuki",
        "char_421_crow",
    ];*/
    const charData = getAllfeaturedCharacters(props.pool).map((v) => {
        const [r, l] = useCharObject(v);
        return { name: v, data: r };
    });
    const featuredSixStars = charData.filter((value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value.data["rarity"] === "six";
    });
    const char_img = featuredSixStars.map((v) => {
        return "/img/avatars/" + v.name + ".webp";
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const get_char_faction = (data) => {
        const returner =
            data.teamId === null
                ? data.groupId === null
                    ? data.nationId === null
                        ? "none"
                        : data.nationId
                    : data.groupId
                : data.teamId;
        return returner;
    };
    const char_faction = featuredSixStars.map((v) => get_char_faction(v.data));
    const faction_img = char_faction.map((v) => {
        const faction_src =
            v === "none"
                ? "/img/factions/none.webp"
                : "/img/factions/logo_" + v + ".webp";
        return faction_src;
    });
    const svgref = useRef<HTMLDivElement>(null);
    return (
        <div className="flex flex-col w-auto h-auto filter drop-shadow-bottom ">
            <div
                style={{ height: "40px", width: "360px" }}
                className="bg-truegray-900"
            >
                <span className="pl-4 w-full h-full flex items-center text-white font-bold font-sans uppercase">
                    {props.pool.name}
                </span>
            </div>
            <div
                style={{ height: "100px", width: "360px" }}
                className="bg-truegray-100 relative items-center flex overflow-hidden "
            >
                <div className="w-full h-full pointer-events-none">
                    <CustomImage src="/ui/dot.webp" />
                </div>
                {faction_img.map((v, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={v}
                        key={i}
                        style={{
                            height: "140px",
                            width: "auto",
                            filter: "invert(70%) sepia(15%) saturate(0%) hue-rotate(15deg) brightness(180%) contrast(85%)",
                            left: `${i * 60 - 40}px`,
                        }}
                        className="absolute pointer-events-none"
                    />
                ))}
                <span
                    className={`absolute rounded-full ${
                        props.pool.type === "limited"
                            ? "bg-red-700"
                            : "bg-truegray-900"
                    } text-white flex justify-center items-center font-bold capitalize pointer-events-none`}
                    style={{
                        width: "100px",
                        height: "30px",
                        left: "15px",
                        transform: "translateY(-10px)",
                    }}
                >
                    {props.pool.type}
                </span>
                {char_img.map((v, i) => (
                    <div
                        className="absolute pointer-events-none"
                        key={i}
                        style={{
                            height: "140px",
                            width: "140px",
                            right: `${i * 100 - 20}px`,
                            zIndex: 10 - i,
                            transform: "translateY(-10px)",
                        }}
                    >
                        <CustomImage src={v} />
                    </div>
                ))}
            </div>
            {props.focused === props.index && (
                <>
                    <p className="absolute text-red-500 font-ibm-korean font-bold text-base bottom-2 left-4">
                        {" "}
                    </p>
                    <div className="w-full h-full border-0 active:border-2 border-yellow-300 absolute"></div>
                </>
            )}
        </div>
    );
}
