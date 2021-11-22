import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { menuStyle, insideStyle } from "./common";
import { SubMenuComp } from "./SubMenuComp";

export function Translate(): JSX.Element {
    const icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-8 lg:w-8"
            viewBox="0 0 20 20"
            fill="#fff"
        >
            <path
                fillRule="evenodd"
                d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                clipRule="evenodd"
            />
        </svg>
    );
    const Languages = [
        { id: 1, name: "한국어" },
        //{ id: 2, name: "日本語" },
        //{ id: 3, name: "English" },
    ];
    const [selectedLang, setSelectedLang] = useState(Languages[0]);
    return (
        <div className={menuStyle}>
            <div className="w-full h-full flex flex-col md:flex-row justify-center items-center from bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="md:w-1/3 md:h-full h-1/3 w-full flex justify-center items-center">
                    <SubMenuComp
                        background="bg-gradient-to-tr from-green-500 via-green-400 to-green-300"
                        text={"번역"}
                        icon={icon}
                    />
                </div>
                <div className="md:w-2/3 md:h-full h-auto w-full flex flex-col md:justify-center md:items-center mt-6 md:mt-1 relative justify-start items-center">
                    <Listbox value={selectedLang} onChange={setSelectedLang}>
                        <div className="md:relative md:mt-1 absolute">
                            <Listbox.Button className="relative w-full py-1 md:py-2 pl-3 pr-10 md:pr-16 text-left text-xs bg-white dark:bg-gray-500 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate text-black dark:text-white">
                                    {selectedLang.name}
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                        className="w-5 h-5 text-gray-400 dark:text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white dark:bg-gray-500 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-xs sm:text-sm">
                                    {Languages.map((lang, langIdx) => (
                                        <Listbox.Option
                                            key={langIdx}
                                            className={({ active }) =>
                                                `${
                                                    active
                                                        ? "text-amber-900 bg-amber-100"
                                                        : "text-gray-900 dark:text-white"
                                                }
                          cursor-default select-none relative py-2 md:pl-10 pl-2 pr-4`
                                            }
                                            value={lang}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`${
                                                            selected
                                                                ? "font-medium"
                                                                : "font-normal"
                                                        } block truncate`}
                                                    >
                                                        {lang.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`${
                                                                active
                                                                    ? "text-amber-600"
                                                                    : "text-amber-600"
                                                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                        >
                                                            <CheckIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
        </div>
    );
}

interface IconProps {
    className: string;
    "aria-hidden"?: string;
}
const CheckIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden={props["aria-hidden"] === "true" ? true : false}
        >
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const SelectorIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
};
