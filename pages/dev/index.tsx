import { DevMain } from "@components/dev_page_component";
import { NextPage } from "next";
import Head from "next/head";

const Dev: NextPage<any> = () => {
    return (
        <>
            <Head>
                <title>{"Arknights One 개발"}</title>
            </Head>
            <DevMain />
        </>
    );
};

export default Dev;
