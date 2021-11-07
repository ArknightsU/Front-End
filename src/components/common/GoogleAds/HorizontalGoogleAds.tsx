/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

// custom horizontal google ads
export function HorizontalGoogleAds(): JSX.Element {
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);
    return (
        <div className="relative h-28 w-full flex justify-center items-center">
            <ins
                id="adsbygoogle"
                className={`adsbygoogle`}
                style={{
                    display: "inline-block",
                    width: "728px",
                    height: "90px",
                }}
                data-ad-client="ca-pub-6003201576759916"
                data-ad-slot="1053079914"
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
