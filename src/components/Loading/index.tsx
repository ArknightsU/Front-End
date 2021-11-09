import { CustomImage } from "@components/common";
import { Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useInterval } from "react-use";

interface LoadingProps {
    loading: boolean;
}

// Main Loading Component
// Called when next-router routing
export function Loading(props: LoadingProps): JSX.Element {
    const [number, setNumber] = useState(0);
    useInterval(
        () => {
            setNumber((prev) => (prev + 1) % 3);
        },
        props.loading ? 500 : null,
    );
    return (
        <Transition
            show={props.loading}
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <div className="w-screen h-screen flex justify-center items-center backdrop-filter backdrop-blur-lg bg-white bg-opacity-25 z-apiloading absolute top-0 left-0">
                <div className="w-1/2 h-1/2 flex flex-col justify-center items-center bg-white p-3 rounded-lg">
                    <div className="h-1/3 w-full flex items-center justify-center">
                        <p className="font-bold font-ibm-korean text-2xl text-truegray-700">
                            {"페이지 이동 중..."}
                        </p>
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center">
                        <div
                            className="w-1/3 h-full flex items-center justify-center"
                            style={{
                                transform:
                                    number === 0
                                        ? "translateY(-30%)"
                                        : "translateY(0)",
                            }}
                        >
                            <CustomImage src="/ui/bear_0.webp" />
                        </div>
                        <div
                            className="w-1/3 h-full flex items-center justify-center"
                            style={{
                                transform:
                                    number === 1
                                        ? "translateY(-30%)"
                                        : "translateY(0)",
                            }}
                        >
                            <CustomImage src="/ui/bear_1.webp" />
                        </div>
                        <div
                            className="w-1/3 h-full flex items-center justify-center"
                            style={{
                                transform:
                                    number === 2
                                        ? "translateY(-30%)"
                                        : "translateY(0)",
                            }}
                        >
                            <CustomImage src="/ui/bear_2.webp" />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
