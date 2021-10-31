/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import React, { useEffect, useState } from "react";
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
    useEffect(() => {
        setStatus("통신 중");
        setLoading(true);
        const startTime = new Date();
        axios
            .get(SERVER_STATUS_URL)
            .then((res) => {
                const endTime = new Date();
                const rtt: number = Number(endTime) - Number(startTime);
                console.log("rtt: ", rtt);
                if (rtt <= 200) {
                    setStatus("양호");
                } else if (rtt <= 600) {
                    setStatus("혼잡");
                } else {
                    setStatus("불안정");
                }
                setLoading(false);
            })
            .catch((e) => {
                setStatus("에러");
            });
    }, [toggle]);
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full h-1/3 flex justify-center items-center">
                        <p className="font-extrabold text-lg">{"API 서버"}</p>
                    </div>
                    <div className="w-full h-1/3 flex justify-center items-center">
                        <div className="w-auto h-auto flex flex-row justify-center items-center">
                            <p className="text-lg font-extrabold text-center">
                                {status}
                            </p>
                            <div className="pl-2 w-auto h-auto flex justify-center items-center">
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
                            className="w-full h-full rounded-lg bg-blue-500 hover:bg-blue-700 active:bg-blue-900 flex justify-center items-center"
                            onClick={() => setToggle(!toggle)}
                        >
                            <p className="font-extrabold text-xs text-white">
                                {"재확인"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
