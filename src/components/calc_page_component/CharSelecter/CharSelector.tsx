import { useWindowSize } from "@components";
import React, { useState } from "react";
import { Filter } from "./Filter";

interface FilterProps {
    rarity: string[];
    profession: string[];
    setRarity: React.Dispatch<React.SetStateAction<Array<string>>>;
    setProfession: React.Dispatch<React.SetStateAction<Array<string>>>;
    charNameArray: string[];
    focused: string[];
    setFocused: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export function CharSelector(props: FilterProps): JSX.Element {
    // character selecter main view point
    // STATE: open state check
    const [open, setOpen] = useState(false);
    const screen_size = useWindowSize();
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center p-5 relative">
            {/* Main Button */}
            <div
                className={`h-14 rounded-2xl flex justify-center items-center ${
                    open
                        ? "bg-red-600 active:bg-red-800"
                        : "bg-truegray-600 active:bg-truegray-800"
                } transition-all duration-700`}
                style={{ width: open ? "100%" : "40%" }}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <p
                    className={`md:text-lg font-bold text-white text-base text-center`}
                >
                    {open ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        "오퍼레이터 선택"
                    )}
                </p>
            </div>
            {/* open drawers */}
            <div
                className={`w-full absolute bg-gray-200 rounded-2xl transition-all duration-700`}
                style={{
                    width: open ? "calc(100% - 40px)" : "30%",
                    height: open
                        ? `calc(${screen_size.height - 200}px)`
                        : "0px",
                    padding: open ? "20px" : "0px",
                    top: open ? "75px" : "75px",
                    zIndex: 49,
                }}
            >
                <div
                    className={`w-full h-full ${
                        open ? "overflow-y-auto" : "overflow-hidden"
                    }`}
                >
                    {/* Filter Component */}
                    <Filter
                        open={open}
                        rarity={props.rarity}
                        setRarity={props.setRarity}
                        profession={props.profession}
                        setProfession={props.setProfession}
                        charNameArray={props.charNameArray}
                        focused={props.focused}
                        setFocused={props.setFocused}
                    />
                </div>
            </div>
        </div>
    );
}
