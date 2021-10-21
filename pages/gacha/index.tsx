import React from "react";
import { Container } from "@components/Container";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { SERVER_URL_GACHA_POOLS } from "src/constants";
import { GachaMain } from "@components/gacha_page_component";

interface GachaPageProps {
    pools: any;
}

const Gacha: NextPage<GachaPageProps> = ({ pools }: GachaPageProps) => {
    console.log(pools);
    return (
        <Container>
            <Link href="/">
                <div className="absolute w-1/12 h-8 bg-gray-400 z-50">
                    go back
                </div>
            </Link>
            <GachaMain pools={pools} />
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const response = await axios.get(SERVER_URL_GACHA_POOLS);
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
