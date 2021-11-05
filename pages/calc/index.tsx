import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { DBInitOver } from "@recoil/atoms";
import { initDB } from "@components";
import { CalcMain } from "@components/calc_page_component/CalcMain";
import Head from "next/head";

const Calc: NextPage<any> = () => {
    const [isDBinitOver, setDBinitOver] = useRecoilState(DBInitOver);
    useEffect(() => {
        if (!isDBinitOver) {
            initDB().then(() => {
                setDBinitOver(true);
            });
        }
    }, []);
    return (
        <>
            <Head>
                <title>{"재료 계산기"}</title>
            </Head>
            <CalcMain />
        </>
    );
};

export default Calc;
