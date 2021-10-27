import { useEffect, useState } from "react";
import { getItem } from "./functions";
import { DB_NAME } from "./db_name";

export function useCharObject(name: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [nullCheck, setNullChekck] = useState({});
    useEffect(() => {
        async function getCharObject(name: string) {
            const data = await getItem(DB_NAME.character_table, name);
            if (data === null) {
                setNullChekck(!nullCheck);
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setData(data);
            }
        }
        getCharObject(name).then(() => {
            setLoading(false);
        });
    }, [name, nullCheck]);
    return [data, loading];
}
