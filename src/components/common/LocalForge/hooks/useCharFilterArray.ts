/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAllCharacterKeys, getItem } from "@components";
import { useEffect, useState } from "react";
import { DB_NAME } from "../db_name";

export function useCharFilterArray(rarity: string[], profession: string[]) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function get() {
            setLoading(true);
            const keys = await getAllCharacterKeys();
            if (rarity.length === 0 && profession.length === 0) {
                return keys;
            } else {
                const array = [];
                for (const key of keys) {
                    const char = await getItem(DB_NAME.character_table, key);
                    if (
                        // @ts-ignore
                        checkRarity(rarity, char["rarity"]) &&
                        // @ts-ignore
                        checkProfession(profession, char["profession"])
                    ) {
                        array.push(key);
                    }
                }
                return array;
            }
        }
        get().then((array) => {
            // @ts-ignore
            setData(array);
            setLoading(false);
        });
    }, [...rarity, ...profession]);
    return [data, loading];
}

const checkRarity = (rarity: string[], data: string): boolean => {
    if (rarity.length === 0) {
        return true;
    }
    if (rarity.includes(data)) {
        return true;
    } else return false;
};

const checkProfession = (profession: string[], data: string): boolean => {
    if (profession.length === 0) {
        return true;
    }
    if (profession.includes(data)) {
        return true;
    } else return false;
};
