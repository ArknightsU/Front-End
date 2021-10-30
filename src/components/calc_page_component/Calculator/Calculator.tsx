import React from "react";
import { MaterialCalculation } from "@components/common";
import { CalculatorChild } from "./CalculatorChild";
import { getMaterialKeys } from "../getMaterialKeys";
import { Flipper, Flipped } from "react-flip-toolkit";

interface CalculatorProps {
    focused: MaterialCalculation[];
    setFocused: React.Dispatch<
        React.SetStateAction<Array<MaterialCalculation>>
    >;
}

export function Calculator(props: CalculatorProps): JSX.Element {
    return props.focused.length === 0 ? (
        <div
            className="h-full w-full md:p-24 p-12"
            style={{ height: "calc(100% - 56px)" }}
        >
            <div className="border-truegray-700 border-8 border-dashed w-full h-full flex justify-center items-center">
                <p className="text-center text-truegray-700 text:xl md:text-2xl font-extrabold p-8">
                    {"선택된 오퍼레이터가 없습니다."}
                    <br />
                    {"위 버튼을 클릭하여 계산할 오퍼레이터를 추가해주세요."}
                </p>
            </div>
        </div>
    ) : (
        <div
            className="h-full w-full p-8 overflow-auto"
            style={{ height: "calc(100% - 56px)" }}
        >
            <div className="h-auto w-full flex flex-row flex-wrap gap-x-3 gap-y-3 justify-center transition-all duration-700">
                <Flipper
                    flipKey={getMaterialKeys(props.focused).join(" ")}
                    className="h-auto w-full"
                    spring="stiff"
                >
                    <ul className="h-auto w-full flex flex-row flex-wrap gap-x-3 gap-y-3 justify-center">
                        {props.focused.map((focus, idx) => (
                            <Flipped
                                flipId={focus.name}
                                key={idx}
                                spring="stiff"
                                stagger={true}
                            >
                                <li className="h-auto w-auto">
                                    <CalculatorChild
                                        focus={focus}
                                        setFocused={props.setFocused}
                                    />
                                </li>
                            </Flipped>
                        ))}
                    </ul>
                </Flipper>
            </div>
        </div>
    );
}
