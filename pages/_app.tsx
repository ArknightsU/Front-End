import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { RecoilRoot } from "recoil";
import { appWithTranslation } from "@i18n";
import { Loading } from "@components";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url: string) => {
            url !== router.pathname ? setLoading(true) : setLoading(false);
        };
        const handleComplete = (url: string) => setLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    }, [router]);
    return (
        <React.Fragment>
            <Loading loading={loading} />
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </React.Fragment>
    );
}

export default MyApp;
