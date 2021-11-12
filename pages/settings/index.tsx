import { SettingsMain } from "@components/settings_page_component";
import { APP_VERSION } from "@recoil/atoms";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface SettingsPageProps {
    version: string;
}
const Settings: NextPage<SettingsPageProps> = (props) => {
    const APP_VERSION_SETTER = useSetRecoilState(APP_VERSION);
    useEffect(() => {
        APP_VERSION_SETTER(props.version);
    }, []);
    return (
        <>
            <Head>
                <title>{"설정"}</title>
            </Head>
            <SettingsMain />
        </>
    );
};

export const getStaticProps: GetStaticProps = () => {
    return { props: { version: process.env.REACT_APP_VERSION } };
};

export default Settings;
