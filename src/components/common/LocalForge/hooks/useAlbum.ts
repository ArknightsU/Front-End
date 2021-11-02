import { useEffect, useState } from "react";
import { getItem } from "../functions";
import { DB_NAME } from "../db_name";
import { getAlbum } from "..";

export function useAlbum(key: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function get() {
            const data = await getAlbum(key);
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
