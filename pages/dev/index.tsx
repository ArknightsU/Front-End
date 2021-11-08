import { DevMain } from "@components/dev_page_component";
import { NextPage } from "next";
import Head from "next/head";

const Dev: NextPage<any> = () => {
    return (
        <>
            <Head>
                <title>{"재료 계산기"}</title>
            </Head>
            <DevMain />
        </>
    );
};

export default Dev;
