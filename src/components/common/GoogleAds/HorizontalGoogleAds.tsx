/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

// custom horizontal google ads
export function HorizontalGoogleAds(): JSX.Element {
    React.useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            // @ts-ignore
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
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
                data-ad-slot="1053079914"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}

/* 
React.useEffect(() => {
        document.cookie = "crossCookie=yes; SameSite=None; Secure";
        document.getElementById("adsbygoogle");
        if (typeof window !== "undefined") {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.log(err);
            }
        }
    }, []);


*/

/* 



*/
