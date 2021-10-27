import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { DBInitOver } from "@recoil/atoms";
import { initDB } from "@components";
import { CalcMain } from "@components/calc_page_component/CalcMain";

const Calc: NextPage<any> = () => {
    const [isDBinitOver, setDBinitOver] = useRecoilState(DBInitOver);
    useEffect(() => {
        if (!isDBinitOver) {
            initDB().then(() => {
                setDBinitOver(true);
            });
        }
    }, []);
    return <CalcMain />;
};

export default Calc;
