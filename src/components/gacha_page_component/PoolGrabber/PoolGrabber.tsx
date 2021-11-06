/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage, useWindowSize } from "@components";
import React, { useRef, useState } from "react";
import { PoolComponent } from "./PoolComponent";

interface PoolGrabProps {
    pools: Array<any>;
    showGrab: boolean;
    focused: number;
    setFocused: React.Dispatch<React.SetStateAction<number>>;
    setShowGrab: React.Dispatch<React.SetStateAction<boolean>>;
    setPoolSelected: React.Dispatch<React.SetStateAction<boolean>>;
}
export function PoolGrabber(props: PoolGrabProps): JSX.Element {
    // Touch Movement State
    const [prevTouch, setPrevTouch] = useState(null);
    const [movementY, setMovementY] = useState(0);
    // Wheel Movement State
    const [wheel, setWheel] = useState(0);
    // Maximum Wheel constant
    const maxWheel = (props.pools.length - 1) * 200;
    const screen_size = useWindowSize();
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div
            className="w-11/12 h-full md:w-1/2 absolute -left-12 sm:left-0 md:left-6 lg:left-12 xl:left-24 flex flex-col justify-center items-center transition-all overflow-x-visible"
            onWheel={(e) => {
                // onWheel Event handler
                setWheel((prev) => {
                    if (prev === 0 && e.deltaY < 0) return prev;
                    if (prev === maxWheel && e.deltaY > 0) return prev;
                    return prev + e.deltaY;
                });
                props.setFocused(Math.floor(wheel / 200));
            }}
            onTouchMove={(e) => {
                // onTouchMove Evevnt Handler
                //console.log(e);
                const touch = e.touches[0];
                if (prevTouch !== null) {
                    //e.movementX = touch.pageX - previousTouch.pageX;
                    // @ts-ignore
                    const movement = touch.pageY - prevTouch.pageY;
                    if (props.focused === 0 && movement > 0) return;
                    if (
                        props.focused === props.pools.length - 1 &&
                        movement < 0
                    )
                        return;
                    setMovementY((prev) => prev + movement);
                    props.setFocused(-Math.floor(movementY / 120));
                }
                // @ts-ignore
                setPrevTouch(touch);
            }}
            onTouchEnd={(e) => {
                // onTouchEnd, set previous touch to null
                setPrevTouch(null);
                //setMovementY(0);
            }}
        >
            <PoolGrabIndicator />
            <div className="overflow-hidden w-full h-full flex justify-center items-center transform translate-x-16 sm:translate-x-0 z-20">
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
                                  165 -
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
                    {props.pools
                        .filter((v) => v.code >= 1000)
                        .sort((a, b) => {
                            return b.code - a.code;
                        })
                        .map((v, i) => (
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
                                    if (i === props.focused) {
                                        props.setPoolSelected(true);
                                        props.setShowGrab(false);
                                    }
                                    props.setFocused(i);
                                    setWheel(i * 200);
                                    setMovementY(-i * 120);
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
            <div
                className="absolute -left-12 flex justify-center items-center z-10"
                style={{ width: "250px", height: "250px" }}
            >
                <CustomImage src="/ui/sprite_hightlight_circle.webp" />
            </div>
        </>
    );
}
