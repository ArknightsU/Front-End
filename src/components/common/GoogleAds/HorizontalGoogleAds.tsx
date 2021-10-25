import React from "react";

export function HorizontalGoogleAds(): JSX.Element {
    React.useEffect(() => {
        document.cookie = "crossCookie=yes; SameSite=None; Secure";
        document.getElementById("adsbygoogle");
        if (typeof window !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);
    return (
        <div className="relative h-28 w-full">
            <ins
                id="adsbygoogle"
                className={`adsbygoogle`}
                style={{
                    display: "block",
                }}
                data-ad-client={"ca-pub-6003201576759916"}
                data-ad-slot="5568687212"
                data-ad-format={"horizontal"}
                data-full-width-responsive={"false"}
            ></ins>
        </div>
    );
}
