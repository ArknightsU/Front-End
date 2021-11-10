import { SettingsMain } from "@components/settings_page_component";
import { NextPage } from "next";
import Head from "next/head";

const Settings: NextPage<any> = () => {
    return (
        <>
            <Head>
                <title>{"설정"}</title>
            </Head>
            <SettingsMain />
        </>
    );
};

export default Settings;
