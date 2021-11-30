/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage, useCharObject } from "@components";
import { ApiLoading } from "@components/ApiSync";
import axios from "axios";
import { useState } from "react";
import ReactJson from "react-json-view";
import Input from "./Input";
import Type, { defineType } from "./Type";
import dynamic from "next/dynamic";

const POOL_URL = "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/admin/pool";
const type: Array<defineType> = [{ name: "featured" }, { name: "limited" }];
export function PoolsMain(): JSX.Element {
    const DynamicReactJson = dynamic(import("react-json-view"), { ssr: true });
    const [loading, setLoading] = useState(false);
    const [gotData, setGotData] = useState({});
    const [sendData, setSendData] = useState({});
    const [char, setChar] = useState("");
    const [charData, dbLoading] = useCharObject(char);
    const [poolName, setPoolName] = useState("");
    const [selected, setSelected] = useState<defineType>(type[0]);
    const handlePost = () => {
        setLoading(true);
        axios
            .post(
                POOL_URL,
                {
                    name: poolName,
                    type: selected.name,
                },
                {
                    headers: {
                        Authorization: "kleechankawai",
                    },
                },
            )
            .then((res) => {
                console.log(res.data);
                setGotData(res.data.pool);
                setSendData(res.data.pool);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    };
    const handlePut = () => {
        console.log(sendData);
        setLoading(true);
        axios
            .put(
                POOL_URL,
                { pool: sendData },
                {
                    headers: {
                        Authorization: "kleechankawai",
                    },
                },
            )
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    };
    return (
        <>
            <ApiLoading open={loading} />
            <div className="w-screen h-screen absolute top-0 left-0 flex flex-col">
                <div className="w-full h-28 bg-truegray-600 p-5 flex justify-start items-center gap-x-5">
                    <div className="w-28 h-28 p-3">
                        <CustomImage src={"/icon.png"} />
                    </div>
                    <div className="w-auto h-full flex flex-col justify-center items-start font-ibm-korean font-bold text-white text-lg">
                        <p> {"ARKNIGHTS ONE"} </p>
                        <p> {"GACHA POOL"} </p>
                        <p> {"CONFIGURE SYSTEM"} </p>
                    </div>
                    <div className="w-auto h-auto ml-auto flex flex-row gap-x-5 mr-28 items-center">
                        <div className="h-full w-auto flex flex-col justify-start items-start gap-y-1">
                            <p className="font-bold font-ibm-korean text-white text-sm uppercase">
                                {"pool name"}
                            </p>
                            <Input setValue={setPoolName} />
                        </div>
                        <div className="h-full w-auto flex flex-col justify-start items-start gap-y-1">
                            <p className="font-bold font-ibm-korean text-white text-sm uppercase">
                                {"pool type"}
                            </p>
                            <Type
                                type={type}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </div>
                        <div
                            className="h-full w-28 bg-blue-800 flex flex-col justify-start items-start p-2 hover:bg-blue-900 active:bg-blue-500 rounded-lg"
                            onClick={() => {
                                handlePost();
                            }}
                        >
                            <p className="font-bold font-ibm-korean text-white text-lg">
                                {"POST"}
                            </p>
                            <p className="font-bold font-ibm-korean text-white text-base">
                                {"풀 데이터 생성"}
                            </p>
                        </div>
                        <div
                            className="h-full w-28 bg-green-800 flex flex-col justify-start items-start p-2 hover:bg-green-900 active:bg-green-500 rounded-lg"
                            onClick={() => {
                                setSendData(gotData);
                            }}
                        >
                            <p className="font-bold font-ibm-korean text-white text-lg">
                                {"RESET"}
                            </p>
                            <p className="font-bold font-ibm-korean text-white text-base">
                                {"데이터 초기화"}
                            </p>
                        </div>
                        <button className="h-auto w-auto">
                            <div
                                className="h-full w-28 bg-red-800 flex flex-col justify-start items-start p-2 hover:bg-red-900 active:bg-red-500 rounded-lg"
                                onClick={() => {
                                    handlePut();
                                }}
                            >
                                <p className="font-bold font-ibm-korean text-white text-lg">
                                    {"PUT"}
                                </p>
                                <p className="font-bold font-ibm-korean text-white text-base">
                                    {"풀 데이터 갱신"}
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
                <div
                    className="w-full flex-grow p-8 bg-black"
                    style={{ height: "calc(100vh - 192px)" }}
                >
                    <div className="w-full h-full bg-white p-8 overflow-auto">
                        <DynamicReactJson
                            src={gotData}
                            onSelect={(value) => {
                                // @ts-ignore
                                setChar(value.value);
                            }}
                            onEdit={(src) => {
                                setSendData(src.updated_src);
                            }}
                            onAdd={(src) => {
                                setSendData(src.updated_src);
                            }}
                            onDelete={(src) => {
                                setSendData(src.updated_src);
                            }}
                        />
                    </div>
                </div>
                <div className="w-full h-20 bg-white flex flex-row justify-start items-center">
                    <div className="w-40 h-full bg-truegray-500 font-bold font-ibm-korean text-2xl flex justify-center items-center text-white">
                        <p>{"캐릭터 정보"}</p>
                    </div>
                    <div className="h-full flex-grow flex flex-row">
                        <div className="w-1/2 h-full font-bold font-ibm-korean text-2xl flex justify-center items-center text-black">
                            <p>
                                {
                                    // @ts-ignore
                                    charData.kr_name === undefined
                                        ? "undefined"
                                        : // @ts-ignore
                                          charData.kr_name
                                }
                            </p>
                        </div>
                        <div className="w-1/2 h-full font-bold font-ibm-korean text-2xl flex justify-center items-center text-white"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
