import { gzDecompress } from "@components/common";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useAsync } from "react-use";

export function useCharTableLocalStorage(name: string) {
    const [char, setChar] = useLocalStorage("character-table");
    const [data, setData] = useState(false);
    useEffect(() => {
        async function get() {
            if (char === undefined) {
                const json_url =
                    "https://arknightsu.github.io/json/character_table.json";
                const json_gz_url =
                    "https://arknightsu.github.io/json/character_table.json.gz";
                const data = await gzDecompress(json_gz_url, json_url);
                setChar(data);
                const returnData = findName(char, name);
                setData(returnData);
            } else {
                const returnData = findName(char, name);
                setData(returnData);
            }
        }
        get();
    }, [name, char]);
    return data;
}

function findName(char: any, name: string) {
    if (char === undefined) {
        console.error("char undefined");
        return null;
    }
    for (const rarity of Object.keys(char)) {
        if (Object.keys(char[rarity]).includes(name)) return char[rarity][name];
    }
}
