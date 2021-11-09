import React, { useState, useEffect } from "react";
import { menuStyle } from "./common";
import Link from "next/link";
import { CustomImage } from "@components";
import axios from "axios";
import { SERVER_URL_GACHA_ALL } from "@constants";

export function Gacha(): JSX.Element {
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get(SERVER_URL_GACHA_ALL)
            .then((res) => {
                setNumber(res.data.total);
                setLoading(false);
            })
            .catch((e) => {
                setError(true);
                setLoading(false);
            });
    }, []);
    return (
        <div className={menuStyle}>
            <Link href={"/gacha"} passHref={true}>
                <div className="w-full h-full flex flex-row justify-start items-center rounded-lg overflow-hidden shadow-br">
                    <div className="w-1/3 md:w-1/5 h-full justify-center items-center bg-red-600">
                        <div className="w-2/3 md:w-1/2 h-1/2 justify-center items-center">
                            <CustomImage src="/ui/icon_5.webp" />
                        </div>
                    </div>
                    <div className="flex-grow h-full relative flex items-center justify-center">
                        <div className="w-full h-full absolute">
                            <CustomImage
                                type="stretch"
                                src="/ui/alert_bg.webp"
                            />
                        </div>
                        <div className="w-full h-full flex flex-col justify-end items-end z-10">
                            <p className="text-base md:text-xl text-right font-ibm-korean font-bold text-truegray-700 mb-auto mr-4 md:mr-10 mt-5">
                                {"현재까지 모집된 대원 수"}
                                <br />
                                {loading
                                    ? "데이터를 읽는 중..."
                                    : error
                                    ? "에러 발생 : 페이지를 새로고침 하거나 API서버의 상태를 확인해주세요."
                                    : String(number).replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ",",
                                      )}
                            </p>
                            <p className="text-2xl md:text-3xl font-ibm-korean font-bold text-truegray-700 mr-4 md:mr-10 mb-5">
                                {"가챠 시뮬레이션"}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
