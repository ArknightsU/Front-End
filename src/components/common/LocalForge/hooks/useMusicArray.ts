import { useEffect, useState } from "react";
import { getMusicKeys } from "..";

export function useMusicArray() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function get() {
            const data = await getMusicKeys();
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
    }, [nullCheck]);
    return [data, loading];
}
