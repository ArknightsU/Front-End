/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

// custom horizontal google ads
export function HorizontalGoogleAds2(): JSX.Element {
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);
    return (
        <div className="relative h-28 w-full">
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-format="fluid"
                data-ad-layout-key="-f9+4w+7x-eg+3a"
                data-ad-client="ca-pub-6003201576759916"
                data-ad-slot="6283024163"
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
