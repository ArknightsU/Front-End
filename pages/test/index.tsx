import { NextPage } from "next";
import { useEffect } from "react";
const Test: NextPage = () => {
    useEffect(() => {
        Array.from(document.getElementsByTagName("iframe")).forEach(
            (iframe) => {
                iframe.contentWindow.addEventListener(
                    "load",
                    () => {
                        const doc = iframe.contentWindow.document;
                        iframe.height = String(doc.body.scrollHeight);
                    },
                    true,
                );
                iframe.contentWindow.addEventListener(
                    "resize",
                    () => {
                        iframe.height = String(
                            iframe.contentWindow.document.body.scrollHeight +
                                40,
                        );
                    },
                    true,
                );
            },
        );
    }, []);
    return (
        <div
            className=" w-screen h-screen"
            /**dangerouslySetInnerHTML={{
                __html: `<iframe
        src="/loadingFrame.html"
        sandbox="allow-script allow-forms allow-modals"
        className="w-full h-full"
    ></iframe>`,
            }}*/
        >
            <iframe
                src="/loadingFrame.html"
                sandbox="allow-script allow-forms allow-modals"
                className="w-full h-full"
            ></iframe>
        </div>
    );
};
export default Test;
