import { useWindowSize } from "@components";
import { CustomImage } from "@components/common";
import { Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";
import { PoolComponent } from "./PoolComponent";

interface PoolGrabProps {
    pools: Array<any>;
    showGrab: boolean;
    focused: number;
    setFocused: React.Dispatch<React.SetStateAction<number>>;
}
export function PoolGrabber(props: PoolGrabProps): JSX.Element {
    const screen_size = useWindowSize();
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div className="w-11/12 h-full md:w-1/2 absolute left-6 lg:left-12 xl:left-24 flex flex-col justify-center items-center transition-all overflow-x-visible">
            <PoolGrabIndicator />
            <div className="overflow-y-hidden w-full h-full flex justify-center items-center">
                <div
                    ref={ref}
                    className="h-auto transition-all z-20 transform-gpu overflow-visible"
                    style={{
                        transform: `translateY(${
                            screen_size.width < 768
                                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-ignore
                                  ref.current?.offsetHeight / 2 -
                                  (140 * 0.8 * 1.2) / 2 -
                                  105 -
                                  (70 * 0.8 + 140 * 0.8 * 0.615) * props.focused
                                : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-ignore
                                  ref.current?.offsetHeight / 2 -
                                  (140 * 1.2) / 2 -
                                  25 -
                                  (70 + 140 * 0.61) * props.focused
                        }px) ${screen_size.width < 768 ? " scale(0.8)" : ""}`,
                    }}
                >
                    {props.pools.map((v, i) => (
                        <div
                            className={`relative transition-all ${
                                i === props.focused
                                    ? "mt-10 mb-10"
                                    : "mt-4 mb-4 filter grayscale"
                            }`}
                            style={
                                i === props.focused
                                    ? {
                                          transform:
                                              "translateX(50px) scale(1.2)",
                                      }
                                    : {}
                            }
                            key={i}
                            onClick={() => {
                                props.setFocused(i);
                                console.log(i);
                            }}
                        >
                            <PoolComponent pool={v} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PoolGrabIndicator(): JSX.Element {
    const screen_size = useWindowSize();
    const indicator_white_length =
        screen_size.width > 768
            ? screen_size.width / 2
            : (11 * screen_size.width) / 12;
    return (
        <>
            <div
                className="absolute bg-gradient-to-r from-black dark:from-white to-transparent opacity-40 rounded-tl-full rounded-bl-full z-0"
                style={{
                    height: "150px",
                    width: indicator_white_length,
                    left: "1px",
                }}
            ></div>
            <div
                className="absolute left-0 border-4 border-black rounded-full flex justify-center items-center z-10"
                style={{ width: "150px", height: "150px" }}
            >
                <div className="absolute h-screen border-2 border-black"></div>
                <div className="absolute w-2/5 h-2/5 bg-black rounded-full flex justify-center items-center">
                    <div className="w-1/3 h-1/3 bg-truegray-500 rounded-full"></div>
                </div>
            </div>
        </>
    );
}
