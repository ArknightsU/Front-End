import React, { useEffect, useRef, useState } from "react";
import { menuStyle, insideStyle } from "./common";
import "react-h5-audio-player/lib/styles.css";
import { initMusicDB } from "@components";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ReactPlayer from "react-player";

// TODO : MUSIC PLAYER
interface MusicProps {
    data: string;
}
export function Music(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingText, setLoadingText] = useState<string>("DB 초기 설정 중");
    useEffect(() => {
        initMusicDB().then(() => {
            setLoading(false);
        });
    }, []);
    return (
        <div className={menuStyle}>
            <div className="w-full h-full flex flew-row justify-center items-center">
                {/* PlayList Component */}
                <div className="w-1/2 h-full rounded-lg overflow-hidden shadow-br">
                    {loading ? (
                        <div className="w-fuill h-full flex flex-col justify-center items-center">
                            <EclipseSpinner />
                            <p>{loadingText}</p>
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <PlayList />
                        </div>
                    )}
                </div>
                {/* Music Player Component */}
                <div className="w-1/2 h-full bg-gray-200 bg-opacity-70 rounded-lg ml-2 shadow-br">
                    {loading ? (
                        <div className="w-fuill h-full flex flex-col justify-center items-center overflow-hidden">
                            <EclipseSpinner />
                            <p>{loadingText}</p>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-end">
                            <div className="w-full flex-grow relative items-end flex">
                                <div className="absolute w-full h-1/2 bg-gradient-to-t from-truegray-700 to-transparent bg-opacity-40"></div>
                            </div>
                            <MusicPlayer />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function MusicPlayer(): JSX.Element {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(50);
    const [repeat, setRepeat] = useState<number>(0);
    const [random, setRandom] = useState<boolean>(false);
    const [play, setPlay] = useState<boolean>(false);
    const [mute, setMute] = useState<boolean>(false);
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
    return (
        <div className="w-full h-full sm:h-1/2 md:h-2/5 flex justify-end items-end">
            <ReactPlayer
                ref={ref}
                url={"http://goldfirestudios.com/proj/howlerjs/sound.ogg"}
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
            />
            <div className="w-full h-full flex flex-col justify-center items-center border-2 border-solid rounded-lg md:rounded-t-none md:rounded-b-lg border-truegray-300">
                {/* Time Slider */}
                <div className="w-full h-1/5 bg-white md:ml-4 md:mr-4 flex flex-row justify-center items-center">
                    <div className="w-1/5 h-full text-truegray-500 flex justify-center items-center">
                        <p>
                            {currentTime === 0
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
                    />
                    <div className="w-1/5 h-full text-truegray-500 flex justify-center items-center">
                        <p className="text-center">
                            {Math.floor(endTime / 60) +
                                ":" +
                                (endTime % 60).toFixed(0)}
                        </p>
                    </div>
                </div>
                {/* Player Comp */}
                <div className="w-full h-3/5 bg-white flex flex-row justify-evenly items-center">
                    <div
                        className="w-1/6 h-1/2 flex justify-center items-center text-truegray-500 hover:text-truegray-400 transition-all duration-500"
                        onClick={() => {
                            setRepeat((prev) => (prev + 1) % 3);
                        }}
                    >
                        {setRepeatComp()}
                    </div>
                    <div className="w-1/2 h-full flex flex-row justify-center items-center">
                        <div className="w-1/4 h-full text-truegray-500 hover:text-truegray-400 transition-all duration-500">
                            <Rewind />
                        </div>
                        <div
                            className="w-1/2 h-full text-truegray-500 hover:text-truegray-400 transition-all duration-500"
                            onClick={() => {
                                setPlay(!play);
                            }}
                        >
                            {!play ? <Play /> : <Pause />}
                        </div>
                        <div className="w-1/4 h-full text-truegray-500 hover:text-truegray-400 transition-all duration-500">
                            <FastFoward />
                        </div>
                    </div>
                    <div
                        className={`w-1/6 h-1/2 flex justify-center items-center ${
                            random
                                ? "text-truegray-500 hover:text-truegray-400"
                                : "text-truegray-300 hover:text-truegray-600"
                        } transition-all duration-500`}
                        onClick={() => {
                            setRandom(!random);
                        }}
                    >
                        <Random />
                    </div>
                </div>
                {/* Volume Slider Area */}
                <div className="w-full h-1/5 flex flex-row justify-center items-center rounded-b-lg bg-white">
                    <div
                        className="w-1/5 h-full text-truegray-500 hover:text-truegray-300 transition-all duration-500"
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

function PlayList(): JSX.Element {
    const [fav, setFav] = useState(false);
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div
                className="w-full flex flex-row items-end"
                style={{ height: "10%", minHeight: "30px" }}
            >
                <div
                    className={`w-1/2 flex justify-center items-center rounded-t-lg transition-all duration-700 ${
                        !fav ? "h-full bg-gray-200" : "h-4/5 bg-truegray-400"
                    }`}
                    onClick={() => {
                        setFav(false);
                    }}
                >
                    <p className="font-bold text-sm font-ibm-korean text-truegray-700">
                        {"모든 곡"}
                    </p>
                </div>
                <div
                    className={`w-1/2 flex justify-center items-center rounded-t-lg transition-all duration-700 ${
                        fav ? "h-full bg-gray-200" : "h-4/5 bg-truegray-400"
                    }`}
                    onClick={() => {
                        setFav(true);
                    }}
                >
                    <p className="font-bold text-sm font-ibm-korean text-truegray-700">
                        {"즐겨찾기"}
                    </p>
                </div>
            </div>
            <div className="w-full flex-grow bg-gray-200"></div>
        </div>
    );
}

// SVG Icon Component Below
const Rewind = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path d="M14.5 20.529V8.471c0-.92-1.002-1.489-1.792-1.019L2.579 13.481a1.186 1.186 0 0 0 0 2.038l10.129 6.029c.79.47 1.792-.099 1.792-1.019z" />
            <path d="M27 20.529V8.471c0-.92-1.002-1.489-1.792-1.019l-10.129 6.029a1.186 1.186 0 0 0 0 2.038l10.129 6.029c.79.47 1.792-.099 1.792-1.019z" />
        </svg>
    );
};

const Random = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M23.5 10h-4.343a3.995 3.995 0 0 0-2.828 1.172l-6.657 6.657A4.003 4.003 0 0 1 6.843 19H2.5"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M2.5 10h4.343c1.061 0 2.078.421 2.828 1.172l6.657 6.657a4.001 4.001 0 0 0 2.828 1.172H23.5"
            />
            <path d="M21.5 12.412V7.588c0-.368.401-.596.717-.408l4.052 2.412a.474.474 0 010 .815l-4.052 2.412a.474.474 0 01-.717-.407zM21.5 21.412v-4.823c0-.368.401-.596.717-.408l4.052 2.412a.474.474 0 010 .815l-4.052 2.412a.475.475 0 01-.717-.408z" />
        </svg>
    );
};

const NoLoop = () => {
    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path d="M3 14.5a1 1 0 0 1-1-1c0-2.757 2.243-5 5-5h15a1 1 0 1 1 0 2H7c-1.654 0-3 1.346-3 3a1 1 0 0 1-1 1z" />
            <path d="M19.5 11.912V7.088c0-.368.401-.596.717-.408l4.052 2.412a.474.474 0 010 .815l-4.052 2.412a.474.474 0 01-.717-.407zM22 20.5H7a1 1 0 110-2h15c1.654 0 3-1.346 3-3a1 1 0 112 0c0 2.757-2.243 5-5 5z" />
            <path d="M9.5 17.088v4.823a.475.475 0 0 1-.717.408l-4.052-2.412a.474.474 0 0 1 0-.815l4.052-2.412a.475.475 0 0 1 .717.408z" />
            <line
                style={{
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeMiterlimit: 7,
                    strokeLinejoin: "round",
                    strokeWidth: "2px",
                }}
                x1="5.207"
                y1="5.46"
                x2="23.323"
                y2="23.142"
            />
        </svg>
    );
};

const LoopOne = () => {
    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path d="M3 14.5a1 1 0 0 1-1-1c0-2.757 2.243-5 5-5h15a1 1 0 1 1 0 2H7c-1.654 0-3 1.346-3 3a1 1 0 0 1-1 1z" />
            <path d="M19.5 11.912V7.088c0-.368.401-.596.717-.408l4.052 2.412a.474.474 0 010 .815l-4.052 2.412a.474.474 0 01-.717-.407zM22 20.5H7a1 1 0 110-2h15c1.654 0 3-1.346 3-3a1 1 0 112 0c0 2.757-2.243 5-5 5z" />
            <path d="M9.5 17.088v4.823a.475.475 0 0 1-.717.408l-4.052-2.412a.474.474 0 0 1 0-.815l4.052-2.412a.475.475 0 0 1 .717.408z" />
            <circle cx="20.14" cy="18.803" r="4.685" />
            <text
                style={{
                    fill: "rgb(255, 255, 255)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    strokeLinecap: "square",
                    strokeWidth: "0px",
                    whiteSpace: "pre",
                }}
                x="17.031"
                y="22.238"
            >
                1
            </text>
        </svg>
    );
};

const Loop = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path d="M3 14.5a1 1 0 0 1-1-1c0-2.757 2.243-5 5-5h15a1 1 0 1 1 0 2H7c-1.654 0-3 1.346-3 3a1 1 0 0 1-1 1z" />
            <path d="M19.5 11.912V7.088c0-.368.401-.596.717-.408l4.052 2.412a.474.474 0 010 .815l-4.052 2.412a.474.474 0 01-.717-.407zM22 20.5H7a1 1 0 110-2h15c1.654 0 3-1.346 3-3a1 1 0 112 0c0 2.757-2.243 5-5 5z" />
            <path d="M9.5 17.088v4.823a.475.475 0 0 1-.717.408l-4.052-2.412a.474.474 0 0 1 0-.815l4.052-2.412a.475.475 0 0 1 .717.408z" />
        </svg>
    );
};

const FastFoward = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path d="M14.5 20.529V8.471c0-.92 1.002-1.489 1.792-1.019l10.129 6.029c.772.46.772 1.578 0 2.038l-10.129 6.029a1.186 1.186 0 0 1-1.792-1.019z" />
            <path d="M2 20.529V8.471c0-.92 1.002-1.489 1.792-1.019l10.129 6.029c.772.46.772 1.578 0 2.038L3.792 21.548A1.186 1.186 0 0 1 2 20.529z" />
        </svg>
    );
};

const Pause = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path d="M12.5 3v23a1 1 0 01-1 1h-4a1 1 0 01-1-1V3a1 1 0 011-1h4a1 1 0 011 1zM22.5 3v23a1 1 0 01-1 1h-4a1 1 0 01-1-1V3a1 1 0 011-1h4a1 1 0 011 1z" />
        </svg>
    );
};

const Play = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path d="M3.674 4.057c0-1.593 1.735-2.579 3.104-1.765l17.545 10.443c1.338.796 1.338 2.733 0 3.529L6.778 26.708c-1.369.815-3.104-.172-3.104-1.765V4.057z" />
        </svg>
    );
};

const Volume = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path d="M3.5 10h4l5.875-4.7A1 1 0 0 1 15 6.081V22.92a1 1 0 0 1-1.625.781L7.5 19h-4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
            <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M20.303 9.197c1.406 1.406 2.197 3.315 2.197 5.303s-.791 3.897-2.197 5.303M23.132 6.368a11.504 11.504 0 010 16.264M17.475 12.025a3.502 3.502 0 010 4.95"
            />
        </svg>
    );
};

const Mute = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 29 29"
            xmlSpace="preserve"
            fill="currentColor"
        >
            <path d="M9.25 10h4l5.875-4.7a1 1 0 0 1 1.625.781V22.92a1 1 0 0 1-1.625.781L13.25 19h-4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
        </svg>
    );
};
