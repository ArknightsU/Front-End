import React from "react";
import { Container } from "@components/Container";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { SERVER_URL_GACHA_POOLS } from "src/constants";
import { GachaMain } from "@components/gacha_page_component";
import { GoBackButton } from "@components/common";

interface GachaPageProps {
    pools: any;
}

const Gacha: NextPage<GachaPageProps> = ({ pools }: GachaPageProps) => {
    return (
        <>
            <>
                <title>{"명일방주 가챠 시뮬레이터"}</title>
            </>
            <Container>
                <GachaMain pools={pools} />
            </Container>
        </>
    );
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const response = await axios.get(SERVER_URL_GACHA_POOLS);
        /// DEV
        if (response.data.pools === null) {
            return { props: { pools: [] } };
        }
        if (response.status === 200) {
            const pools = response.data.pools;
            return { props: { pools: pools } };
        }
    } catch (error) {
        console.log(error);
        return { props: { pools: {} } };
    }
};

export default Gacha;
