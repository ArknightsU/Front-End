// remove ads
/*
declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[];
    }
}

import { useCookie } from "react-use";

export function Ads(): JSX.Element {
    React.useEffect(() => {
        document.cookie = "crossCookie=yes; SameSite=None; Secure";
        document.getElementById("adsbygoogle");
        if (typeof window !== "undefined") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);
    return (
        <div className={menuStyle + " overflow-hidden"}>
            <div className="relative h-full w-full bg-gray-100 overflow-hidden">
                <ins
                    id="adsbygoogle"
                    className={`adsbygoogle` + " h-full w-full"}
                    style={{
                        display: "block",
                        width: "120px",
                        height: "120px",
                    }}
                    data-ad-client={"ca-pub-6003201576759916"}
                    data-ad-slot="5568687212"
                    data-ad-format={"horizontal"}
                    data-adtest="on"
                    data-full-width-responsive={"false"}
                ></ins>
            </div>
        </div>
    );
}
*/
