import { Transition } from "@headlessui/react";
import React from "react";

interface LoadingProps {
    loading: boolean;
}

// Main Loading Component
// Called when next-router routing
export function Loading(props: LoadingProps): JSX.Element {
    return (
        <Transition
            show={props.loading}
            enter="transition-all duration-500"
            enterFrom="-top-full"
            enterTo="top-0"
            leave="transition-all duration-500"
            leaveFrom="top-0"
            leaveTo="-top-full"
        >
            <div className="z-50 absolute w-screen h-screen backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center">
                <span className="text-8xl font-bold">{"LOADING"}</span>
                <div></div>
            </div>
        </Transition>
    );
}
