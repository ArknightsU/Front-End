/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAllCharacterKeys, getItem } from "@components";
import { useEffect, useState } from "react";
import { DB_NAME } from "../db_name";

export function useCharFilterArray(
    rarity?: string | string[],
    profession?: string | string[],
) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function get() {
            setLoading(true);
            const keys = await getAllCharacterKeys();
            if (rarity === undefined && profession === undefined) {
                return keys;
            }
            const array = [];
            for (const key of keys) {
                const data = await getItem(DB_NAME.character_table, key);
                // @ts-ignore
                if (data.rarity === rarity) {
                    array.push(key);
                }
            }
            return array;
        }
        get().then((array) => {
            setLoading(false);
            // @ts-ignore
            setData(array);
        });
    }, [rarity]);
    return [data, loading];
}
