import { useEffect, useState } from "react";
import { getAlbumDBValue, getMusicDBValue } from "..";

export function useMusicDB(key: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function get() {
            console.log(key);
            console.log("INFINITE CHECK");
            const data = await getMusicDBValue(key);
            if (data === null) {
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
