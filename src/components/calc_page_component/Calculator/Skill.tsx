/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage, MaterialCalculation } from "@components/common";

interface UpgradeProps {
    name: string;
    focus_upgrade: Array<boolean | null> | null;
    setFocused: React.Dispatch<
        React.SetStateAction<Array<MaterialCalculation>>
    >;
    show: boolean;
    handleShowClick: () => void;
}

export function Upgrade(props: UpgradeProps): JSX.Element {
    // handle upgrade button clicked
    const handleUpgrade = (n: number) => {
        props.setFocused((prev) => {
            const previous = [...prev];
            const now =
                previous[previous.findIndex((v) => v.name === props.name)];
            if (now.upgrade === null) {
                return prev;
            }
            now.upgrade[n] = !now.upgrade[n];
            return previous;
        });
    };
    return (
        <div className="w-full h-full flex flex-col justify-end items-center pt-4">
            <div className="w-full h-auto mb-auto">
                <p className="w-full h-auto font-sans font-bold text-md md:text-lg text-center">
                    {"정예화"}
                </p>
                <hr className="w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent" />
            </div>
            <div className="w-full flex-grow flex flex-col justify-evenly items-center pr-4 pl-4">
                <button
                    onClick={() => {
                        handleUpgrade(0);
                    }}
                    className="w-full h-14 disabled:opacity-50"
                    disabled={props.focus_upgrade === null ? true : false}
                >
                    <div
                        className={`w-full h-14 relative rounded-lg transition-all duration-700 ${
                            props.focus_upgrade === null ||
                            props.focus_upgrade[0] === false
                                ? "bg-black"
                                : "bg-yellow-300"
                        } p-2`}
                    >
                        <CustomImage src="/ui/CharacterInfo/UI_CHARACTER_INFO_ELITE_1.webp" />
                    </div>
                </button>
                <button
                    className="w-full h-16 disabled:opacity-50"
                    disabled={
                        props.focus_upgrade === null ||
                        props.focus_upgrade[1] === null
                            ? true
                            : false
                    }
                    onClick={() => {
                        handleUpgrade(1);
                    }}
                >
                    <div
                        className={`w-full h-16 relative rounded-lg transition-all duration-700 ${
                            props.focus_upgrade === null ||
                            props.focus_upgrade[1] === null ||
                            props.focus_upgrade[1] === false
                                ? "bg-black"
                                : "bg-yellow-300"
                        } p-2`}
                    >
                        <CustomImage src="/ui/CharacterInfo/UI_CHARACTER_INFO_ELITE_2.webp" />
                    </div>
                </button>
            </div>
            <BottomButton
                handleShowClick={props.handleShowClick}
                show={props.show}
                disabled={
                    props.focus_upgrade === null ||
                    !props.focus_upgrade.some((v) => v === true)
                        ? true
                        : false
                }
            />
        </div>
    );
}

interface SkillProps {
    name: string;
    focus_skill: Array<boolean> | null;
    setFocused: React.Dispatch<
        React.SetStateAction<Array<MaterialCalculation>>
    >;
}

// skill rank file's url
const RANK_FILE_URL = [
    "/img/rank/2.webp",
    "/img/rank/3.webp",
    "/img/rank/4.webp",
    "/img/rank/5.webp",
    "/img/rank/6.webp",
    "/img/rank/7.webp",
];

export function Skill(props: SkillProps): JSX.Element {
    const handleSkill = (n: number) => {
        props.setFocused((prev) => {
            const previous = [...prev];
            const now =
                previous[previous.findIndex((v) => v.name === props.name)];
            //@ts-ignore
            if (now[`allSkill`] === null) {
                return prev;
            }
            //@ts-ignore
            now[`allSkill`][n] = !now[`allSkill`][n];
            return previous;
        });
    };
    return (
        <div className="w-full h-full flex flex-col justify-end items-center pt-4 ">
            {/* TOP TITLE */}
            <div className="w-full h-auto mb-auto">
                <p className="w-full h-auto font-sans font-bold text-md md:text-lg text-center">
                    {`공통`}
                </p>
                <hr className="w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent" />
            </div>
            {/* CONTENTS */}
            {props.focus_skill === null ? (
                <div className="bg-noskill w-full flex-grow flex justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4/5 w-20"
                    >
                        <line x1="0" y1="100%" x2="100%" y2="0" stroke="#000" />
                    </svg>
                    <p className="absolute bg-gray-200 font-bold text-lg font-mono capitalize pt-1 pb-1">
                        {"NO DATA"}
                    </p>
                </div>
            ) : (
                <div className="w-full flex-grow justify-center items-center overflow-y-auto flex flex-row flex-wrap gap-x-1">
                    {props.focus_skill.map((v, idx) => (
                        <div
                            key={idx}
                            className={`h-9 w-9 transition-all duration-700 ${
                                // @ts-ignore
                                props.focus_skill[idx] === false
                                    ? "bg-black"
                                    : "bg-yellow-300"
                            } rounded-xl relative`}
                            onClick={() => {
                                handleSkill(idx);
                            }}
                        >
                            <CustomImage src={RANK_FILE_URL[idx]} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

interface BottomButtonProps {
    disabled?: boolean;
    show: boolean;
    handleShowClick: () => void;
}
export const BottomButton: React.FC<BottomButtonProps> = ({
    handleShowClick,
    show,
    disabled = false,
}) => {
    return (
        <button
            className={`w-4/5 h-auto flex justify-center items-center ${
                show ? "bg-yellow-300" : "bg-gray-400"
            } rounded-2xl disabled:filter disabled:grayscale grayscale`}
            disabled={disabled}
            onClick={handleShowClick}
        >
            <div className="w-full h-6 flex justify-center items-center ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-full w-full `}
                    viewBox="0 0 20 20"
                    fill={disabled ? "#808080" : "#000"}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </button>
    );
};
