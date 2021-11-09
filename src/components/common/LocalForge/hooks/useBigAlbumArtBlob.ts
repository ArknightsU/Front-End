import { useEffect, useState } from "react";
import { getBigAlbumArtBlob } from "..";

export function useBigAlbumArtBlob(key: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function get() {
            //console.log("check ifinite");
            setLoading(true);
            const data = await getBigAlbumArtBlob(key);
            if (data === null) {
                console.log(data);
                setNullChekck(!nullCheck);
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setData(data);
            }
        }
        get().then(() => {
            setLoading(false);
        });
    }, [nullCheck, key]);
    return [data, loading];
}
