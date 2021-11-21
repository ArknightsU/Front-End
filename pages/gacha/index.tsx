import React, { useEffect } from "react";
import { Container } from "@components/Container";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { SERVER_URL_GACHA_POOLS } from "src/constants";
import { GachaMain } from "@components/gacha_page_component";
import { GoBackButton } from "@components/common";
import { useRecoilState } from "recoil";
import { DBInitOver } from "@recoil/atoms";
import { initDB } from "@components/common/LocalForge";
import Head from "next/head";

interface GachaPageProps {
    pools: any;
}

const Gacha: NextPage<GachaPageProps> = ({ pools }: GachaPageProps) => {
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
                <title>{"명일방주 가챠 시뮬레이터"}</title>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6003201576759916"
                    crossOrigin="anonymous"
                ></script>
            </Head>
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return { props: { pools: pools.sort((a, b) => b.code - a.code) } };
        }
    } catch (error) {
        console.log(error);
        return { props: { pools: {} } };
    }
};

export default Gacha;

/*

<script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6003201576759916"
                    crossOrigin="anonymous"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-6003201576759916",
                   enable_page_level_ads: true crossorigin="anonymous"
              });
                `,
                    }}
                />

*/
