import React from "react";
import { menuStyle, insideStyle } from "./common";
import Link from "next/link";
import { CustomImage } from "@components/common";

export function Calculation(): JSX.Element {
    return (
        <div className={menuStyle}>
            <Link href="/calc" passHref>
                <div className="w-full h-full flex flex-row justify-start items-center rounded-lg overflow-hidden shadow-br">
                    <div className="w-1/3 md:w-1/5 h-full justify-center items-center bg-green-600">
                        <div className="w-2/3 md:w-1/2 h-1/2 flex justify-end items-end ml-2">
                            <CustomImage src="/ui/icon_3.webp" />
                        </div>
                    </div>
                    <div className="flex-grow h-full relative flex items-center justify-center bg-truegray-800">
                        <div className="w-full h-full absolute flex justify-end items-end">
                            <CustomImage
                                type="stretch"
                                src="/ui/dot_bkg.webp"
                            />
                        </div>
                        <div className="w-full h-full flex flex-col justify-end items-end z-10">
                            <p className="text-lg text-right md:text-xl font-ibm-korean font-bold text-truegray-700 mb-auto mr-4 md:mr-10 mt-5">
                                {"캐릭터 수 총합"}
                                <br />
                                {"214"}
                            </p>
                            <p className="text-2xl md:text-3xl font-ibm-korean font-bold text-truegray-700 mr-4 md:mr-10 mb-5">
                                {"재료 계산"}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
