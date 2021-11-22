/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import { CustomImage, GachaPool, getItem } from "@components/common";
import { DetailChildLayout } from "./DetailChildLayout";
import axios from "axios";
import { GET_GACHA_API_URL, SERVER_URL_RESET_STACK } from "src/constants";
import { CharMinify } from "../GachaAnimation/CharMinify";
import { useSessionStorage, useLocalStorage } from "react-use";
import { getAllfeaturedCharacters } from "../getAllfeaturedCharacters";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { ServerStats } from "./ServerStats";
import { ClientStats } from "./ClientStats";
import { useRecoilValue } from "recoil";
import { Settings } from "@recoil/atoms";
/**
 * Gacha Detail Main component
 */
interface GachaDetailProps {
    poolSelected: boolean;
    focused: number;
    pools: Array<GachaPool>;
    setDoAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setGachaData: React.Dispatch<React.SetStateAction<string[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    backButtonHandle: () => void;
}
export function GachaDetail(props: GachaDetailProps): JSX.Element {
    const settings = useRecoilValue(Settings);
    // loading state
    const [loading, setLoading] = useState(false);
    // session storage for gem
    const [gem, setGem] = settings.GC_SAVE_GACHA_DATA_IN_LOCAL
        ? useLocalStorage(props.pools[props.focused].id + "-gem", 0)
        : useSessionStorage(props.pools[props.focused].id + "-gem", 0);
    // session storage for stone
    const [stone, setStone] = settings.GC_SAVE_GACHA_DATA_IN_LOCAL
        ? useLocalStorage(props.pools[props.focused].id + "-stone", 0)
        : useSessionStorage(props.pools[props.focused].id + "-stone", 0);
    // function: reset session storage for this banner
    const resetUsed = () => {
        setGem(0);
        setStone(0);
    };
    // do Gacha function
    const doGacha = (count: number) => {
        props.setLoading(true);
        axios
            .get(GET_GACHA_API_URL(count, props.pools[props.focused].id))
            .then((res) => {
                // @ts-ignore
                setGem(gem + 600 * count);
                // @ts-ignore
                setStone(Math.ceil((gem + 600 * count) / 180));
                props.setLoading(false);
                props.setGachaData(res.data.result);
                props.setDoAnimation(true);
                //console.log(res);
                // @ts-ignore
                setGachaData([...gachaData, ...res.data.result]);
            })
            .catch((reason) => {
                props.setLoading(false);
                props.setError(true);
                console.error(reason);
            });
    };
    // reset button state & action
    const [resetCooldown, setResetCooldown] = useState(0);
    const resetStack = () => {
        setResetCooldown(3);
        if (loading) {
            return;
        }
        setLoading(true);
        axios
            .post(SERVER_URL_RESET_STACK)
            .then((res) => {
                setLoading(false);
            })
            .catch((reason) => {
                setLoading(false);
            });
    };
    // reset timer
    useEffect(() => {
        if (resetCooldown <= 0) {
            setResetCooldown(0);
            return;
        }
        setTimeout(() => {
            setResetCooldown((prev) => prev - 1);
        }, 1000);
    }, [resetCooldown]);
    const type = props.pools[props.focused]["type"];
    // 가챠로 뽑은 오퍼레이터는 세션 스토리지에 저장됨
    const [gachaData, setGachaData] = settings.GC_SAVE_GACHA_DATA_IN_LOCAL
        ? useLocalStorage(props.pools[props.focused].id.toString(), [])
        : useSessionStorage(props.pools[props.focused].id.toString(), []);
    const resetSessionData = () => {
        setGachaData([]);
        resetUsed();
    };
    // first animation initializer
    const [initAnime, setInitAnime] = useState(false);
    useEffect(() => {
        setInitAnime(props.poolSelected);
    }, [props.poolSelected]);
    return (
        <div
            className={`absolute w-screen h-screen flex flex-row justify-center items-center overflow-hidden pt-40 md:pt-32`}
        >
            <div
                className={`w-11/12 h-full md:w-1/2 pr-2 pb-40 absolute transition-all duration-1000 z-40 top-40 flex flex-col items-start overflow-y-auto ${
                    initAnime
                        ? "right-6 lg:right-12 xl:right-24"
                        : "-right-full"
                }  `}
            >
                <div className="w-full h-auto transition-all mt-4 duration-1000 z-40 flex flex-col gap-y-2 mb-12">
                    {/* Orundum, Originite Status Start */}
                    <div className="w-full h-16 flex flex-row justify-center items-center p-1 gap-x-3">
                        <div
                            className="w-1/2 h-full rounded-lg bg-truegray-700 hover:bg-truegray-900 transition-colors duration-500 active:border-2 border-0 border-yellow-300 flex justify-center items-center"
                            onClick={props.backButtonHandle}
                        >
                            <p className="font-ibm-korean font-bold text-base md:text-lg text-white">
                                {"< 배너 목록"}
                            </p>
                        </div>
                        <div
                            className="w-1/2 h-full rounded-lg bg-green-700 hover:bg-green-900 transition-colors duration-500 active:border-2 border-0 border-yellow-300 flex justify-center items-center"
                            onClick={resetUsed}
                        >
                            <p className="font-ibm-korean font-bold text-base md:text-lg text-white">
                                {"사용한 재화 초기화"}
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-18 md:h-28 flex flex-row justify-evenly items-center">
                        <div className="h-18 md:h-28 w-44 md:w-60 bg-white bg-opacity-80 relative rounded-xl overflow-hidden flex flex-row drop-shadow-bottom">
                            <div className="h-full w-full top-0 left-16 md:top-8 md:left-20 bg-orundum bg-no-repeat bg-opacity-50 filter blur absolute bg-top bg-contain"></div>
                            <div className="h-full w-1/4 bg-truegray-800 flex flex-col justify-center items-center">
                                {/*
                                <span className="w-full text-white font-bold flex justify-center items-center">
                                    {"사용한\n합성옥"}
                                </span>*/}
                                <span className="font-bold text-white text-sm md:text-lg">
                                    {"USED"}
                                </span>
                                <div className="w-8 h-8 md:w-14 md:h-14">
                                    <CustomImage src="/img/items/mini/redgem.webp" />
                                </div>
                            </div>
                            <div className="h-full w-3/4 flex justify-center items-center">
                                <span className="font-bold text-black text-3xl">
                                    {gem}
                                </span>
                            </div>
                        </div>
                        <div className="h-18 md:h-28 w-44 md:w-60 bg-white bg-opacity-80 relative rounded-xl overflow-hidden flex flex-row drop-shadow-bottom">
                            <div className="h-full w-full top-0 left-16 md:top-8 md:left-20 bg-originite bg-no-repeat bg-opacity-50 filter blur absolute bg-top bg-contain"></div>
                            <div className="h-full w-1/4 bg-truegray-800 flex flex-col justify-center items-center">
                                {/*
                                <span className="w-full text-white font-bold flex justify-center items-center">
                                    {"사용한\n합성옥"}
                                </span>*/}
                                <span className="font-bold text-white text-sm md:text-lg">
                                    {"USED"}
                                </span>
                                <div className="w-8 h-8 md:w-14 md:h-14">
                                    <CustomImage src="/img/items/mini/puregem.webp" />
                                </div>
                            </div>
                            <div className="h-full w-3/4 flex justify-center items-center">
                                <span className="font-bold text-black text-3xl">
                                    {stone}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Orundum, Originite Status End */}
                    {/* Button Area Start */}
                    <div className="w-full h-24 flex flex-row justify-center items-center mt-0 font-ibm-korean font-bold text-truegray-800">
                        <div
                            className="h-full w-48 flex justify-center items-center relative"
                            onClick={() => {
                                doGacha(1);
                            }}
                        >
                            <CustomImage src="/ui/UI_GACHA_POOL_ONE_DRAW.webp" />
                            <p className="absolute text-lg sm:text-xl md:text-3xl bottom-5">
                                {"1회 진행"}
                            </p>
                        </div>

                        <div
                            className="h-full w-48 flex justify-center items-center relative"
                            onClick={() => {
                                doGacha(10);
                            }}
                        >
                            <CustomImage src="/ui/UI_GACHA_POOL_TEN_DRAW.webp" />
                            <p className="absolute text-lg sm:text-xl md:text-3xl bottom-5">
                                {"10회 진행"}
                            </p>
                        </div>
                        <div className="h-full w-24 ml-3 flex justify-center items-center">
                            <div
                                className={`w-20 h-20 ${
                                    loading && resetCooldown !== 0
                                        ? "bg-red-300"
                                        : "bg-red-600"
                                }  p-2 flex justify-center items-center rounded-lg`}
                                onClick={() => {
                                    resetStack();
                                }}
                            >
                                {loading ? (
                                    <EclipseSpinner />
                                ) : (
                                    <p className=" whitespace-pre-line text-sm md:text-base text-center text-white leading-none transition-all duration-500">
                                        {resetCooldown !== 0
                                            ? `쿨타임\n${resetCooldown}s`
                                            : "스택\n초기화"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Button Area End */}
                    {/* Banner Calculation Inforamtion */}
                    <DetailChildLayout title="배너 확률 정보" initial={false}>
                        <div className="w-full h-auto flex flex-col font-ibm-korean font-bold text-truegray-800 dark:text-white">
                            <div className="w-full h-auto flex flex-col gap-y-2">
                                <div className="w-full h-10 flex flex-row items-center">
                                    <InfoIcon />
                                    <p className="text-lg">
                                        {"픽업 대상 오퍼레이터"}
                                    </p>
                                </div>
                                <div className="w-full h-auto flex flex-row items-center justify-start gap-x-4">
                                    {getAllfeaturedCharacters(
                                        props.pools[props.focused],
                                    ).map((featured: string, idx: number) => (
                                        <CharMinify
                                            charName={featured}
                                            key={idx}
                                        />
                                    ))}
                                </div>
                                <div className="w-full h-10 flex flex-row items-center">
                                    <InfoIcon />
                                    <p className="text-lg">{"확률 정보"}</p>
                                </div>
                                <div className="w-full h-auto flex flex-row items-center pl-4">
                                    <p className="text-base whitespace-pre-line overflow-clip break-words">
                                        {"★6 2% \n★5 8% \n★4 50% \n★3 40%\n\n"}
                                        {`픽업 대상의 경우, 6성 출현 확률의 ${
                                            type === "featured" ? "50%" : "70%"
                                        }, 5성 출현 확률의 50%, 4성 출현 확률의 20%로 등장합니다.\n\n`}
                                        {`50회 동안 6성이 등장하지 않을 경우, 이후 1회마다 6성 등장 확률이 2%p씩 증가하여 100회째에 100%의 확률로 6성 오퍼레이터를 획득 할 수 있습니다.\n`}
                                    </p>
                                </div>
                                <div className="w-full h-10 flex flex-row items-center">
                                    <InfoIcon />
                                    <p className="text-lg">{"서버 정보"}</p>
                                </div>
                                <div className="w-full h-auto flex flex-row items-center pl-4">
                                    <p className="text-base whitespace-pre-line overflow-clip break-words">
                                        {
                                            "스택의 경우, IP정보에 기반하여 저장하고 있습니다.\n스택 정보는 일정 시간이 지난 후 서버에서 폐기되며, 사용자는 일반적인 방법을 통해 스택에 관여할 수 없습니다.\n 스택의 초기화를 원하시면 가챠 버튼 우측의 스택 초기화를 눌러주세요.\n"
                                        }
                                        {
                                            "스택이 적용된 6성 등장확률은 약 2.8%입니다."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </DetailChildLayout>
                    <ClientStats
                        focused={props.focused}
                        pools={props.pools}
                        gachaData={gachaData}
                        resetClientData={resetSessionData}
                    />
                    <ServerStats focused={props.focused} pools={props.pools} />
                </div>
            </div>
        </div>
    );
}

const InfoIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
            />
        </svg>
    );
};

interface DataProps {
    allData: any;
    hitData: any;
}
export const DataTalbe = (props: DataProps) => {
    const headMap = ["★6", "★5", "★4", "★3"];
    return (
        <div
            className="w-5/6 h-36 justify-center items-center flex flex-col border-black dark:border-white"
            style={{ borderWidth: "2px" }}
        >
            <div className="w-full h-1/4 flex flex-row">
                {headMap.map((v, idx) => (
                    <div
                        key={idx}
                        className="w-1/4 h-full border-black dark:border-white flex justify-center items-center"
                        style={{ borderWidth: "1px" }}
                    >
                        <p className="text-base md:text-xl text-truegray-700 dark:text-white font-bold font-ibm-korean">
                            {v}
                        </p>
                    </div>
                ))}
            </div>
            <div className="w-full h-1/4 flex flex-row">
                {Object.keys(props.allData).map((v, idx) => (
                    <div
                        key={idx}
                        className="w-1/4 h-full border-black dark:border-white flex justify-center items-center"
                        style={{ borderWidth: "1px" }}
                    >
                        <p className="text-base md:text-xl text-truegray-700 dark:text-white font-bold font-ibm-korean">
                            {props.allData[v]}
                        </p>
                    </div>
                ))}
            </div>
            <div className="w-full h-1/4 flex flex-row">
                {headMap.map((v, idx) => (
                    <div
                        key={idx}
                        className="w-1/4 h-full border-black dark:border-white flex justify-center items-center"
                        style={{ borderWidth: "1px" }}
                    >
                        <p className="text-base md:text-xl text-truegray-700 dark:text-white font-bold font-ibm-korean">
                            {"픽업" + v}
                        </p>
                    </div>
                ))}
            </div>
            <div className="w-full h-1/4 flex flex-row">
                {Object.keys(props.hitData).map((v, idx) => (
                    <div
                        key={idx}
                        className="w-1/4 h-full border-black dark:border-white flex justify-center items-center"
                        style={{ borderWidth: "1px" }}
                    >
                        <p className="text-base md:text-xl text-truegray-700 dark:text-white font-bold font-ibm-korean">
                            {props.hitData[v]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
