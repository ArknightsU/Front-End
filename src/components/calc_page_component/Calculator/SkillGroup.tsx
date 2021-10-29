/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MaterialCalculation } from "@components/common";
import { CustomImage } from "@components/common";

interface SkillGroupProps {
    name: string;
    focus_skill1: Array<boolean> | null;
    focus_skill2: Array<boolean> | null;
    focus_skill3: Array<boolean> | null;
    setFocused: React.Dispatch<
        React.SetStateAction<Array<MaterialCalculation>>
    >;
}

export function SkillGroup(props: SkillGroupProps): JSX.Element {
    return (
        <div className="w-full h-full flex flex-col">
            <SkillGroupChild
                name={props.name}
                num={1}
                focus={props.focus_skill1}
                setFocused={props.setFocused}
            />
            <SkillGroupChild
                name={props.name}
                num={2}
                focus={props.focus_skill2}
                setFocused={props.setFocused}
            />
            <SkillGroupChild
                name={props.name}
                num={3}
                focus={props.focus_skill3}
                setFocused={props.setFocused}
            />
        </div>
    );
}

interface SkillGroupChildProps {
    name: string;
    focus: Array<boolean> | null;
    num: number;
    setFocused: React.Dispatch<
        React.SetStateAction<Array<MaterialCalculation>>
    >;
}
const RANK_IMAGE_URL = [
    "/img/rank/m-1.webp",
    "/img/rank/m-2.webp",
    "/img/rank/m-3.webp",
];
function SkillGroupChild(props: SkillGroupChildProps): JSX.Element {
    const handleSkill = (n: number) => {
        props.setFocused((prev) => {
            const previous = [...prev];
            const now =
                previous[previous.findIndex((v) => v.name === props.name)];
            //@ts-ignore
            if (now[`skill${props.num}`] === null) {
                return prev;
            }
            //@ts-ignore
            now[`skill${props.num}`][n] = !now[`skill${props.num}`][n];
            return previous;
        });
    };
    const OBJECT_KEY = ["skill1", "skill2", "skill3"];
    const isSelected =
        // @ts-ignore
        props.focus === null ? false : props.focus[OBJECT_KEY[props.num]];
    return (
        <div
            className={`w-full h-1/3 flex flex-row justify-start md:pl-2 rounded-md ${
                props.num === 2 ? "bg-gray-300" : "bg-gray-200"
            }`}
        >
            {/* TOP TITLE */}
            <div className="w-auto h-full flex flex-row justify-center items-center flex-shrink-0">
                <p className="w-auto h-auto font-sans font-bold text:md md:text-lg text-center center">
                    {`스킬${props.num}`}
                </p>
                <div className="w-1 h-full bg-gradient-to-b from-transparent via-black to-transparent md:ml-2" />
            </div>
            <div className="h-full flex-grow flex flex-row justify-center items-center gap-x-2">
                {props.focus === null ? (
                    <div className="w-full flex-grow flex justify-center items-center relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-4/5"
                        >
                            <line
                                x1="0"
                                y1="100%"
                                x2="100%"
                                y2="0"
                                stroke="#000"
                            />
                        </svg>
                        <p
                            className={`absolute ${
                                props.num === 2 ? "bg-gray-300" : "bg-gray-200"
                            } font-bold text-lg font-mono capitalize p-4`}
                        >
                            {"NO DATA"}
                        </p>
                    </div>
                ) : (
                    props.focus.map((v, idx) => (
                        <div
                            className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
                                v ? "bg-yellow-300" : "bg-black"
                            } p-1 rounded-lg`}
                            key={idx}
                            onClick={() => {
                                handleSkill(idx);
                            }}
                        >
                            <CustomImage src={RANK_IMAGE_URL[idx]} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
