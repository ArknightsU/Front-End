/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useWindowSize } from "@components";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { useCharObject } from "../../common/LocalForge/hooks/useCharObject";
import { Profile } from "./Profile";
import { CustomImage } from "@components/common";
import { useState } from "react";

interface CalculatorChildProps {
    focus: string;
    setFocused: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export function CalculatorChild(props: CalculatorChildProps): JSX.Element {
    const [char, loading] = useCharObject(props.focus);
    const [open, setOpen] = useState(false);
    const window_size = useWindowSize();
    const isMobile = window_size.width < 768 ? true : false;
    return (
        // Main Wrapper
        <div
            className="transition-all duration-700"
            style={{ height: open ? "500px" : "250px", width: "780px" }}
        >
            {loading ? (
                // Loading Component
                <div className="w-full h-full p-5 flex flex-col justify-center items-center">
                    <EclipseSpinner />
                    <p className="font-bold text-lg text-black text-center">
                        {"LOADING"}
                    </p>
                </div>
            ) : (
                <>
                    {/* Main Component Start */}
                    <div
                        className="w-full flex flex-row justify-end items-center relative bg-gray-200 rounded-3xl drop-shadow-bottom"
                        style={{ height: "250px" }}
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        {/* Character Picture Area */}
                        <div className="h-auto w-auto flex flex-col justify-center items-center mr-auto">
                            <Profile
                                char={props.focus}
                                //@ts-ignore
                                name={char.kr_name}
                                //@ts-ignore
                                displayNumber={char.displayNumber}
                            />
                            {/* If it is Mobile, render buttons under picture area */}
                            {isMobile ? (
                                <div className="h-12 w-24 flex flex-row mt-2">
                                    <div className="h-full w-1/2 bg-green-600 rounded-lg flex justify-center items-center">
                                        <CalculatorSVG
                                            type="sort"
                                            className="w-2/3 h-2/3"
                                        />
                                    </div>
                                    <div className="h-full w-1/2 bg-red-800 rounded-lg flex justify-center items-center">
                                        <CalculatorSVG
                                            type="trash"
                                            className="w-2/3 h-2/3"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        {/* Character Picture Area End */}
                        {/* Main Function Area Start */}
                        <div className="h-full flex-grow flex flex-row">
                            {/* 정예화 */}
                            <div className="h-full w-1/4 bg-gray-500"></div>
                            {/* 1스킬 */}
                            <div className="h-full w-1/4 bg-gray-600"></div>
                            {/* 2스킬 */}
                            <div className="h-full w-1/4 bg-gray-700"></div>
                            {/* 3스킬 */}
                            <div
                                className={`h-full w-1/4 bg-gray-800 ${
                                    isMobile ? "rounded-r-3xl" : ""
                                }`}
                            ></div>
                        </div>
                        {/* If its not mobile, render buttons on the right side of component */}
                        {isMobile ? (
                            <></>
                        ) : (
                            <>
                                <div className="h-full w-14 flex flex-col rounded-r-3xl">
                                    <div className="h-1/2 w-full bg-red-800 rounded-tr-3xl flex justify-center items-center">
                                        <CalculatorSVG
                                            type="trash"
                                            className="w-1/2 h-1/2"
                                        />
                                    </div>
                                    <div className="h-1/2 w-full bg-green-600 rounded-br-3xl flex justify-center items-center">
                                        <CalculatorSVG
                                            type="sort"
                                            className="w-1/2 h-1/2"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {/* Bottom Side show result component */}
                    <div
                        className="w-full bg-black rounded-3xl transition-all duration-700 origin-top"
                        style={{
                            height: "250px",
                            transform: `scale(${open ? 1 : 0})`,
                        }}
                    ></div>
                </>
            )}
        </div>
    );
}

// SVG component below
interface SVGProps {
    type: "trash" | "sort";
    className: string;
}
const CalculatorSVG: React.FC<SVGProps> = (props) => {
    return props.type === "trash" ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            viewBox="0 0 20 20"
            fill="#fff"
        >
            <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
            />
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            viewBox="0 0 20 20"
            fill="#fff"
        >
            <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
            />
        </svg>
    );
};
