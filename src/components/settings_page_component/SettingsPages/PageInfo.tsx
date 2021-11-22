import { useRecoilValue } from "recoil";
import DisplayText from "../DisplayValues";
import { APP_VERSION, Settings } from "@recoil/atoms";
import { CustomImage } from "@components";
import { useResetRecoilState } from "recoil";
import { useState } from "react";
export function PageInfo(): JSX.Element {
    const APP_VERSION_VALUE = useRecoilValue(APP_VERSION);
    const ResetSettings = useResetRecoilState(Settings);
    const [confirm, setConfirm] = useState(false);
    return (
        <div className="w-auto h-auto flex flex-col">
            <div className="w-full h-auto flex flex-col gap-y-10">
                <div className="w-full h-auto">
                    <p className="font-bold text-2xl">
                        {DisplayText.info.meta.title}
                    </p>
                </div>
                <div className="w-full h-60 flex justify-center items-center">
                    <CustomImage src="/icon.png" />
                </div>
                <div className="w-full h-auto flex flex-col justify-center items-center gap-y-2">
                    <p className="text-2xl font-bold text-black dark:text-white">
                        {"ARKNIGHTS ONE"}
                    </p>
                    <p className="text-lg font-bold">{`${DisplayText.info.IF_SERVICE_VERSION.title}${APP_VERSION_VALUE}`}</p>
                    <div className="w-full h-auto justify-center items-center flex flex-row">
                        <p className="text-base">
                            {DisplayText.info.IF_BUGREPORT.title}
                        </p>
                        <a
                            href={`mailto:admin@arknights.one?body=${DisplayText.info.IF_BUGREPORT_MAIL_BODY.title}`}
                        >
                            <p className="text-base underline font-bold">
                                {"admin@arknights.one"}
                            </p>
                        </a>
                    </div>
                    <div className="w-full h-auto justify-center items-center flex flex-row mt-8">
                        <p className="text-lg font-bold mr-10">
                            {DisplayText.info.IF_ALL_SETTING_RESET.title}
                        </p>
                        {confirm ? (
                            <div
                                className="w-24 h-10 bg-green-500 rounded-lg flex transition-all duration-500 justify-center items-center hover:bg-green-700 border-0 active:border-2 border-amber-300"
                                onClick={() => {
                                    setConfirm(false);
                                }}
                            >
                                <p className="font-bold text-base md:text-lg text-white">
                                    {
                                        DisplayText.info
                                            .IF_CANCEL_RESET_BUTTON_TEXT.title
                                    }
                                </p>
                            </div>
                        ) : (
                            <div
                                className="w-24 h-10 bg-red-500 rounded-lg flex transition-all duration-500 justify-center items-center hover:bg-red-700 border-0 active:border-2 border-amber-300"
                                onClick={() => {
                                    setConfirm(true);
                                }}
                            >
                                <p className="font-bold text-base md:text-lg text-white">
                                    {
                                        DisplayText.info.IF_RESET_BUTTON_TEXT
                                            .title
                                    }
                                </p>
                            </div>
                        )}
                        {confirm ? (
                            <div
                                className="w-40 h-10 bg-red-800 rounded-lg flex transition-all duration-500 justify-center items-center hover:bg-red-900 border-0 active:border-2 border-amber-300"
                                onClick={() => {
                                    ResetSettings();
                                    setConfirm(false);
                                }}
                            >
                                <p className="font-bold text-base md:text-lg text-white">
                                    {
                                        DisplayText.info.IF_RESET_BUTTON_TEXT
                                            .description
                                    }
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
