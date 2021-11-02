import { useEffect, useState } from "react";
import { getAlbumDBValue } from "..";

export function useAlbumDB(key: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function get() {
            const data = await getAlbumDBValue(key);
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
