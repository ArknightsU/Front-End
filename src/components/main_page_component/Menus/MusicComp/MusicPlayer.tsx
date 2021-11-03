/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMusicBlob } from "@components";
import { SetStateAction, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(50);
    const [repeat, setRepeat] = useState<number>(0);
    const [random, setRandom] = useState<boolean>(false);
    const [play, setPlay] = useState<boolean>(false);
    const [mute, setMute] = useState<boolean>(false);
    const [musicObj, loading] = useMusicBlob(props.playList[props.current]);
    const [url, setUrl] = useState("");
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
    useEffect(() => {
        // @ts-ignore
        setUrl(URL.createObjectURL(musicObj));
    }, [musicObj]);
    return (
        <div className="w-full h-full sm:h-1/2 md:h-2/5 flex justify-end items-end">
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
