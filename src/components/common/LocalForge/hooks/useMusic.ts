import { useEffect, useState } from "react";
import { getMusic } from "..";

export function useMusic(key: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function get() {
            const data = await getMusic(key);
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
