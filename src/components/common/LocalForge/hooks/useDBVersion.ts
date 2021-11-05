import { useEffect, useState } from "react";
import { getItem } from "../functions";
import { DB_NAME } from "../db_name";
import { useCharFilterArray } from "./useCharFilterArray";

export function useDBVersion() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");
    const [nullCheck, setNullChekck] = useState({});
    const [array, arrayloading] = useCharFilterArray([], []);
    useEffect(() => {
        async function get() {
            const data = await getItem(DB_NAME.db_version, "version");
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
    }, [nullCheck, array.length]);
    return [data, loading];
}
