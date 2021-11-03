import { useEffect, useState } from "react";
import { getMusicBlob } from "..";

export function useMusicBlob(key: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(new Blob());
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function get() {
            console.log("CHECK INFINITE");
            const data = await getMusicBlob(key);
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
