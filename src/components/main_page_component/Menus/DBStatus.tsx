import { useDBVersion, useWindowSize } from "@components";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import React from "react";
import { menuStyle, insideStyle } from "./common";

interface DBStatusProps {
    loading: boolean;
    toggleInitDb: () => void;
}
export function DBStatus(props: DBStatusProps): JSX.Element {
    const [dbversion, versionLoading] = useDBVersion();
    const screen_size = useWindowSize();
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <div className="w-1/4 h-full flex justify-center items-center bg-truegray-700 rounded-l-lg md:rounded-l-lg">
                        <p className="w-auto h-auto fo font-extrabold text-sm md:text-md text-white text-center">
                            {"DB"}
                            <br />
                            {"상태"}
                        </p>
                    </div>
                    <div className="w-1/4 h-full flex justify-center items-center">
                        <p className="w-auto h-auto font-extrabold text-md md:text-md text-center font-ibm-korean">
                            {props.loading ? "로딩 중" : "정상"}
                        </p>
                        <div className="ml-2 h-auto w-auto relative flex justify-center items-center">
                            <div
                                className={`p-1 rounded-full animate-ping absolute ${
                                    props.loading
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                            ></div>
                            <div
                                className={` p-1 rounded-full absolute ${
                                    props.loading
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                            ></div>
                        </div>
                    </div>
                    <div className="h-4/5 w-0 border-truegray-700 border-solid border-l-2 border-opacity-30" />
                    <div className="w-1/4 h-full flex flex-col justify-center items-center">
                        <div className="w-full h-1/2 flex justify-center items-center">
                            <p className="w-auto h-auto font-ibm-sans font-bold text-md md:text-md text-center">
                                {"version"}
                            </p>
                        </div>
                        <div className="w-full h-1/2 flex justify-center items-center">
                            {versionLoading ? (
                                <EclipseSpinner />
                            ) : (
                                <pre className="w-auto h-auto font-ibm-mono font-bold text-xs md:text-xs text-center leading-none">
                                    {String(dbversion).substring(
                                        0,
                                        String(dbversion).length / 2,
                                    )}
                                    <br className="h-0" />
                                    {String(dbversion).substring(
                                        String(dbversion).length / 2,
                                        String(dbversion).length,
                                    )}
                                </pre>
                            )}
                        </div>
                    </div>
                    <div className="h-4/5 w-0 border-truegray-700 border-solid border-l-2 border-opacity-30" />
                    <div className="w-1/4 h-full p-1">
                        {props.loading ? (
                            <EclipseSpinner />
                        ) : (
                            <div
                                className="w-full h-full bg-red-600 hover:bg-red-800 transition-all rounded-lg flex justify-center items-center"
                                onClick={props.toggleInitDb}
                            >
                                <p className="w-auto h-auto text-white font-ibm-korean font-extrabold text-xs md:text-xs text-center">
                                    {"강제"}
                                    <br />
                                    {"재설정"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/*      
                (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="w-full h-1/2 flex flex-row justify-center items-center">
                            <div className="w-1/2 h-full flex justify-center items-center">
                                <p className="w-auto h-auto font-extrabold text-md md:text-md text-center">
                                    {"DB"}
                                    <br />
                                    {"상태"}
                                </p>
                            </div>
                            <div className="h-4/5 w-0 border-truegray-700 border-solid border-l-2 border-opacity-30" />
                            <div className="w-1/2 h-full flex justify-center items-center">
                                <p className="w-auto h-auto font-extrabold text-xs md:text-md text-center">
                                    {props.loading ? "로딩 중" : "정상"}
                                </p>
                                <div className="ml-2 h-auto w-auto relative flex justify-center items-center">
                                    <div
                                        className={`p-1 rounded-full animate-ping absolute ${
                                            props.loading
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        }`}
                                    ></div>
                                    <div
                                        className={` p-1 rounded-full absolute ${
                                            props.loading
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-1/2 flex flex-row justify-center items-center">
                            <div className="w-1/2 h-full flex flex-col justify-center items-center">
                                <div className="w-full h-1/2 flex justify-center items-center">
                                    <p className="w-auto h-auto font-extrabold text-xxs md:text-md text-center">
                                        {"version"}
                                    </p>
                                </div>
                                <div className="w-full h-1/2 flex justify-center items-center">
                                    {versionLoading ? (
                                        <EclipseSpinner />
                                    ) : (
                                        <pre className="w-auto h-auto font-ibm-mono font-bold text-xxs md:text-xs text-center leading-none">
                                            {String(dbversion).substring(
                                                0,
                                                String(dbversion).length / 2,
                                            )}
                                            <br className="h-0" />
                                            {String(dbversion).substring(
                                                String(dbversion).length / 2,
                                                String(dbversion).length,
                                            )}
                                        </pre>
                                    )}
                                </div>
                            </div>
                            <div className="h-4/5 w-0 border-truegray-700 border-solid border-l-2 border-opacity-30" />
                            <div className="w-1/2 h-full p-1">
                                {props.loading ? (
                                    <EclipseSpinner />
                                ) : (
                                    <div
                                        className="w-full h-full bg-red-600 hover:bg-red-800 transition-all rounded-lg flex justify-center items-center"
                                        onClick={props.toggleInitDb}
                                    >
                                        <p className="w-auto h-auto text-white font-extrabold text-xxs md:text-xs text-center">
                                            {"강제"}
                                            <br />
                                            {"재설정"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
*/
