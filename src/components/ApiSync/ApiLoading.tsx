import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useInterval } from "react-use";
import { CustomImage } from "..";

interface LoadingProps {
    open: boolean;
}
export function ApiLoading(props: LoadingProps): JSX.Element {
    const [number, setNumber] = useState(0);
    useInterval(
        () => {
            setNumber((prev) => (prev + 1) % 3);
        },
        props.open ? 500 : null,
    );
    return (
        <Transition
            show={props.open}
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
                            {"API 서버의 응답을 기다리는 중..."}
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
