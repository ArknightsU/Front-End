/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage, useCharObject } from "@components";
import { MarqueeText } from "@components/common/MarqueeText";

interface CharMinifyProps {
    charName: string;
}

export function CharMinify(props: CharMinifyProps): JSX.Element {
    const rarityDict = { six: 5, five: 4, four: 3 };
    const [charData, loading] = useCharObject(props.charName);
    // @ts-ignore
    const characterName = loading ? "정보취득중" : charData["kr_name"];
    // @ts-ignore
    const charRarity = loading ? null : charData["rarity"];
    return (
        <div className="w-24 h-auto flex flex-col pointer-events-none">
            {Object.keys(rarityDict).includes(charRarity) ? (
                <div
                    className="w-24 h-24 absolute"
                    style={{
                        transform: `scale(${
                            charRarity === "six" ? 2.15 : 1.3
                        })`,
                        zIndex: 9,
                    }}
                >
                    <CustomImage
                        // @ts-ignore
                        src={`/ui/UI_GACHA_STATISTICS_RARITY${rarityDict[charRarity]}.webp`}
                    />
                </div>
            ) : (
                <></>
            )}

            <div className="w-24 h-24 z-10">
                <CustomImage src={`/img/avatars/${props.charName}.webp`} />
            </div>
            <MarqueeText className="w-24 h-auto z-10" textClassName="text-xl">
                {characterName}
            </MarqueeText>
        </div>
    );
}
