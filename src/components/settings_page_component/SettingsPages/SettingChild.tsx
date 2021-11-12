import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { ToggleSwitch } from "@components/common/ToggleSwitch";
import { useState } from "react";
import { useInterval } from "react-use";
import { SetterOrUpdater } from "recoil";

interface SettingsProps {
    title?: string;
    desciprtion?: string;
    loading?: boolean;
}
interface SettingsSwitchProps extends SettingsProps {
    switchLabelLeft?: string;
    switchLabelRight?: string;
    switchValue: boolean;
    switchSetter: any;
}
export function SettingSwitch(props: SettingsSwitchProps): JSX.Element {
    return (
        <div className="w-full h-auto flex flex-col font-ibm-korean text-truegray-700 gap-y-2">
            <div className="w-full h-auto flex flex-row justify-start items-start">
                <div className="flex-grow h-auto flex justify-start items-start">
                    <p className="font-bold text-lg whitespace-pre-line">
                        {props.title}
                    </p>
                    {props.loading ? (
                        <div className="w-10 h-10 ml-4">
                            <EclipseSpinner />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="w-auto h-full flex flex-row justify-center items-center text-md font-bold gap-x-3">
                    <p>{props.switchLabelLeft}</p>
                    <ToggleSwitch
                        checked={props.switchValue}
                        setChecked={props.switchSetter}
                    />
                    <p>{props.switchLabelRight}</p>
                </div>
            </div>
            <div className="w-full h-auto flex justify-start items-start">
                <p className="text-base whitespace-pre-line">
                    {props.desciprtion}
                </p>
            </div>
        </div>
    );
}

interface SettingsButtonProps extends SettingsProps {
    onClick?: any;
    buttonText?: string;
    buttonColor?: string;
    buttonTextColor?: string;
}
export function SettingButton(props: SettingsButtonProps): JSX.Element {
    const [coolDown, setCooldown] = useState(0);
    useInterval(
        () => {
            if (coolDown <= 0) {
                setCooldown(0);
                return;
            }
            setCooldown((prev) => prev - 1);
        },
        coolDown <= 0 ? null : 1000,
    );
    return (
        <div className="w-full h-auto flex flex-col font-ibm-korean text-truegray-700 gap-y-2">
            <div className="w-full h-auto flex flex-row justify-start items-start">
                <div className="flex-grow h-auto flex justify-start items-start">
                    <p className="font-bold text-lg whitespace-pre-line">
                        {props.title}
                    </p>
                    {props.loading ? (
                        <div className="w-10 h-10 ml-4">
                            <EclipseSpinner />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className={`w-20 h-full flex justify-center items-center ${
                        coolDown > 0 ? "opacity-50 " : "opacity-100 "
                    } ${
                        props.buttonColor
                            ? props.buttonColor
                            : "bg-red-500 hover:bg-red-700 border-0 active:border-2 border-amber-300 "
                    }
                        ${
                            props.buttonTextColor
                                ? props.buttonTextColor
                                : "text-white "
                        }
                    } font-bold rounded-lg`}
                    onClick={() => {
                        if (coolDown > 0) {
                            return;
                        }
                        setCooldown(3);
                        props.onClick();
                    }}
                >
                    <p>
                        {coolDown > 0
                            ? `쿨타임 ${coolDown}s`
                            : props.buttonText
                            ? props.buttonText
                            : "체크"}
                    </p>
                </div>
            </div>
            <div className="w-full h-auto flex justify-start items-start">
                <p className="text-base whitespace-pre-line">
                    {props.desciprtion}
                </p>
            </div>
        </div>
    );
}

interface SettingsVersionProps extends SettingsProps {
    onClick?: any;
    buttonText?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    currentVersion?: string;
    latestVersion?: string;
}
export function SettingVersion(props: SettingsVersionProps): JSX.Element {
    const [coolDown, setCooldown] = useState(0);
    useInterval(
        () => {
            if (coolDown <= 0) {
                setCooldown(0);
                return;
            }
            setCooldown((prev) => prev - 1);
        },
        coolDown <= 0 ? null : 1000,
    );
    return (
        <div className="w-full h-auto flex flex-col font-ibm-korean text-truegray-700 gap-y-2">
            <div className="w-full h-auto flex flex-row justify-start items-start">
                <div className="flex-grow h-auto flex justify-start items-start">
                    <p className="font-bold text-lg whitespace-pre-line">
                        {props.title}
                    </p>
                    {props.loading ? (
                        <div className="w-10 h-10 ml-4">
                            <EclipseSpinner />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div
                    className={`w-20 h-full flex justify-center items-center ${
                        coolDown > 0 ? "opacity-50 " : "opacity-100 "
                    } ${
                        props.buttonColor
                            ? props.buttonColor
                            : "bg-red-500 hover:bg-red-700 border-0 active:border-2 border-amber-300 "
                    }
                        ${
                            props.buttonTextColor
                                ? props.buttonTextColor
                                : "text-white "
                        }
                    } font-bold rounded-lg`}
                    onClick={() => {
                        if (coolDown > 0) {
                            return;
                        }
                        setCooldown(3);
                        props.onClick();
                    }}
                >
                    <p>
                        {coolDown > 0
                            ? `쿨타임 ${coolDown}s`
                            : props.buttonText
                            ? props.buttonText
                            : "체크"}
                    </p>
                </div>
            </div>
            <div className="w-full h-auto flex justify-start items-start">
                <p className="text-base whitespace-pre-line">
                    {props.desciprtion}
                </p>
            </div>
            <div className="w-full h-auto flex flex-col justify-start font-bold items-start rounded-lg bg-gray-400 p-2 gap-y-4">
                <div className="w-full h-auto flex flex-row justify-start items-start gap-x-4">
                    <p className="text-sm">{"현재 버전: "}</p>
                    <p>{props.currentVersion}</p>
                </div>
                <div className="w-full h-auto flex flex-row justify-start items-start gap-x-4">
                    <p className="text-sm">{"최신 버전: "}</p>
                    <p>{props.latestVersion}</p>
                </div>
            </div>
        </div>
    );
}
