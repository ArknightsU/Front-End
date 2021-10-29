import React from "react";
import { MaterialCalculation } from "@components/common";
import { CalculatorChild } from "./CalculatorChild";
import { getMaterialKeys } from "../getMaterialKeys";

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
                {props.focused.map((focus, idx) => (
                    <CalculatorChild
                        key={idx}
                        focus={focus}
                        setFocused={props.setFocused}
                    />
                ))}
            </div>
        </div>
    );
}
