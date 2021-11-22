/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { menuStyle, insideStyle } from "./common";
import { SERVER_STATUS_URL } from "@constants";

const PING_COLORS = {
    "통신 중": "bg-yellow-700",
    양호: "bg-green-500",
    혼잡: "bg-yellow-600",
    불안정: "bg-red-500",
    에러: "bg-black",
};
export function Status(): JSX.Element {
    const [status, setStatus] = useState("통신 중");
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [coolDown, setCooldown] = useState(false);
    useEffect(() => {
        setStatus("통신 중");
        // Api server has cooldown with 0.5s in same ip
        // so delaying api satus function to 1s
        // For Gacha's get pool/total
        setCooldown(true);
        setLoading(true);
        setTimeout(() => {
            setCooldown(false);
        }, 3000);
        const startTime = new Date();
        axios
            .get(SERVER_STATUS_URL)
            .then((res) => {
                const endTime = new Date();
                const rtt: number = Number(endTime) - Number(startTime);
                //console.log("rtt: ", rtt);
                if (rtt <= 600) {
                    setStatus("양호");
                } else if (rtt <= 1800) {
                    setStatus("혼잡");
                } else {
                    setStatus("불안정");
                }
                setLoading(false);
            })
            .catch((e) => {
                setStatus("에러");
                setLoading(false);
            });
    }, [toggle]);
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full h-1/5 flex justify-center items-center bg-truegray-700 dark:bg-gray-700 rounded-t-lg md:rounded-t-lg">
                        <p className="font-extrabold text-lg text-white font-ibm-korean">
                            {"API 서버"}
                        </p>
                    </div>
                    <div className="w-full flex-grow flex justify-center items-center">
                        <div className="w-auto h-auto flex flex-row justify-center items-center">
                            <p className="text-lg font-extrabold md:text-2xl font-ibm-korean text-center text-black dark:text-white">
                                {status}
                            </p>
                            <div className="pl-2 w-auto h-auto flex justify-center items-center ">
                                <div
                                    // @ts-ignore
                                    className={`absolute p-1 rounded-full animate-ping ${PING_COLORS[status]}`}
                                ></div>
                                <div
                                    // @ts-ignore
                                    className={`absolute p-1 rounded-full ${PING_COLORS[status]}`}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-1/3 flex justify-center items-center p-2">
                        <div
                            className={`w-full h-full rounded-lg ${
                                coolDown
                                    ? "bg-gray-800"
                                    : "bg-blue-500 hover:bg-blue-700 active:bg-blue-900"
                            } flex justify-center items-center`}
                            onClick={() => {
                                if (coolDown) return;
                                setToggle(!toggle);
                            }}
                        >
                            <p className="font-bold text-base md:text-lg text-white font-ibm-korean">
                                {coolDown ? "쿨타임" : "재확인"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
