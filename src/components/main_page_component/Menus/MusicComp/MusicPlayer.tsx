/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMusicBlob } from "@components";
import { SetStateAction, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { EclipseSpinner } from "../../../common/EclipseSpinner/index";
import {
    FastFoward,
    Loop,
    LoopOne,
    Mute,
    NoLoop,
    Pause,
    Play,
    Random,
    Rewind,
    Volume,
} from "./svg";

interface MusicPlayerProps {
    playList: string[];
    current: number;
    setCurrent: React.Dispatch<SetStateAction<number>>;
}
export function MusicPlayer(props: MusicPlayerProps): JSX.Element {
    // 현재 시간
    const [currentTime, setCurrentTime] = useState<number>(0);
    // 음악의 최대 시간
    const [endTime, setEndTime] = useState<number>(0);
    // 볼륨
    const [volume, setVolume] = useState<number>(50);
    // 반복 state
    // 0: 루프 없음
    // 1: 한곡 반복
    // 2: 전체 반복
    const [repeat, setRepeat] = useState<number>(0);
    // 랜덤 state
    const [random, setRandom] = useState<boolean>(false);
    // 재생
    const [play, setPlay] = useState<boolean>(false);
    // 재생 스테이스 메모리
    // 로딩 시 시간이 걸리기 때문에, 일단 일시 정지 후, 이전 스테이트를 복구하기 위함
    const [memoryState, setMemoryState] = useState(false);
    // 음소거
    const [mute, setMute] = useState<boolean>(false);
    // 뮤직 Blob 오브젝트
    const [musicObj, loading] = useMusicBlob(props.playList[props.current]);
    // Blob to Url
    const [url, setUrl] = useState("");
    // Repeat Icon Setter
    const setRepeatComp = () => {
        switch (repeat) {
            case 0:
                return <NoLoop />;
            case 1:
                return <LoopOne />;
            case 2:
                return <Loop />;
            default:
                return;
        }
    };
    const ref = useRef<ReactPlayer>(null);
    // 음악이 변경 될 때 재생 스테이터스를 자동으로 관리
    useEffect(() => {
        if (loading === true) {
            if (play) setMemoryState(true);
            else setMemoryState(false);
            setPlay(false);
        }
        if (loading === false) {
            if (memoryState) {
                setPlay(true);
                setMemoryState(false);
                return;
            } else {
                setMemoryState(false);
                return;
            }
        }
    }, [loading]);
    // 음악이 변경될 때 url을 변경
    useEffect(() => {
        // @ts-ignore
        setUrl(URL.createObjectURL(musicObj));
    }, [musicObj]);
    return (
        <div className="w-full h-2/5 flex justify-end items-end">
            <ReactPlayer
                ref={ref}
                url={url}
                playing={play}
                loop={repeat === 1 ? true : false}
                volume={volume / 100}
                muted={mute}
                width={0}
                height={0}
                onProgress={(state) => {
                    setCurrentTime(state.playedSeconds);
                }}
                onDuration={(duration) => {
                    setEndTime(duration);
                }}
                onEnded={() => {
                    if (random) {
                        props.setCurrent(Math.random() * props.playList.length);
                    } else if (repeat === 0) {
                        setCurrentTime(0);
                        setPlay(false);
                    } else if (repeat === 1) {
                        setCurrentTime(0);
                    } else {
                        props.setCurrent(
                            (prev) => prev + (1 % props.playList.length),
                        );
                    }
                }}
            />
            <div className="w-full h-full flex flex-col justify-center items-center border-2 border-solid rounded-lg md:rounded-t-none md:rounded-b-lg border-truegray-300 dark:border-black">
                {/* Time Slider */}
                <div className="w-full h-1/5 bg-white dark:bg-gray-700 md:ml-4 md:mr-4 flex flex-row justify-center items-center">
                    <div className="w-1/5 h-full text-truegray-500 flex justify-center items-center dark:text-white">
                        <p>
                            {loading
                                ? "Wait.."
                                : currentTime === 0
                                ? "--:--"
                                : Math.floor(currentTime / 60) +
                                  ":" +
                                  (currentTime % 60).toFixed(0)}
                        </p>
                    </div>
                    <Slider
                        className="w-3/5 h-full"
                        value={currentTime}
                        min={0}
                        max={endTime}
                        ariaLabelForHandle={String(volume)}
                        onChange={(value) => {
                            ref.current?.seekTo(value, "seconds");
                        }}
                        // @ts-ignore
                        disabled={loading}
                    />
                    <div className="w-1/5 h-full text-truegray-500 flex justify-center items-center dark:text-white">
                        <p className="text-center">
                            {loading
                                ? "Wait..."
                                : Math.floor(endTime / 60) +
                                  ":" +
                                  (endTime % 60).toFixed(0)}
                        </p>
                    </div>
                </div>
                {/* Player Comp */}
                {loading ? (
                    <div className="w-full h-3/5 flex flex-col justify-center items-center bg-white dark:bg-gray-700">
                        <EclipseSpinner />
                        <p className=" font-ibm-korean font-bold text-black dark:text-white text-base whitespace-pre-line">
                            {"음악 준비 중"}
                        </p>
                    </div>
                ) : (
                    <div className="w-full h-3/5 bg-white dark:bg-gray-700 flex flex-row justify-evenly items-center">
                        <div
                            className="w-1/6 h-1/2 flex justify-center items-center text-truegray-500 hover:text-truegray-400 dark:text-gray-200 dark:hover:text-gray-500 transition-all duration-500"
                            onClick={() => {
                                setRepeat((prev) => (prev + 1) % 3);
                            }}
                        >
                            {setRepeatComp()}
                        </div>
                        <div className="w-1/2 h-full flex flex-row justify-center items-center">
                            <div
                                className="w-1/4 h-full text-truegray-500  hover:text-truegray-400 dark:text-gray-200 dark:hover:text-gray-500 transition-all duration-500"
                                onClick={() => {
                                    props.setCurrent((prev) => {
                                        if (prev === 0) {
                                            return 0;
                                        } else {
                                            return (
                                                (prev - 1) %
                                                props.playList.length
                                            );
                                        }
                                    });
                                }}
                            >
                                <Rewind />
                            </div>
                            <div
                                className="w-1/2 h-full text-truegray-500 hover:text-truegray-400 dark:text-gray-200 dark:hover:text-gray-500 transition-all duration-500"
                                onClick={() => {
                                    setPlay(!play);
                                }}
                            >
                                {!play ? <Play /> : <Pause />}
                            </div>
                            <div
                                className="w-1/4 h-full text-truegray-500 hover:text-truegray-400 dark:text-gray-200 dark:hover:text-gray-500 transition-all duration-500"
                                onClick={() => {
                                    props.setCurrent((prev) => {
                                        return (
                                            (prev + 1) % props.playList.length
                                        );
                                    });
                                }}
                            >
                                <FastFoward />
                            </div>
                        </div>
                        <div
                            className={`w-1/6 h-1/2 flex justify-center items-center ${
                                random
                                    ? "text-truegray-500 hover:text-truegray-400 "
                                    : "text-truegray-300 hover:text-truegray-600 dark:text-gray-200 dark:hover:text-gray-500"
                            } transition-all duration-500`}
                            onClick={() => {
                                setRandom(!random);
                            }}
                        >
                            <Random />
                        </div>
                    </div>
                )}

                {/* Volume Slider Area */}
                <div className="w-full h-1/5 flex flex-row justify-center items-center rounded-b-lg bg-white dark:bg-gray-700">
                    <div
                        className="w-1/5 h-full text-truegray-500 hover:text-truegray-300 dark:text-gray-200 dark:hover:text-gray-500 transition-all duration-500"
                        onClick={() => {
                            setMute(!mute);
                        }}
                    >
                        {mute ? <Mute /> : <Volume />}
                    </div>
                    <Slider
                        className="w-3/5 h-full"
                        value={volume}
                        ariaLabelForHandle={String(volume)}
                        onChange={(value) => {
                            setVolume(value);
                        }}
                        disabled={mute ? true : false}
                    />
                    <div className="w-1/12 h-full text-truegray-500"></div>
                </div>
            </div>
        </div>
    );
}
