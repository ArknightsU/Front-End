import { gzDecompress } from "@components/common";
import { useEffect, useState } from "react";
import { useLocalStorage, useSessionStorage } from "react-use";
import { DBVersion } from "../../recoil/atoms/DBVersion/index";
import { useRecoilState } from "recoil";
import { CharacterTable, Version } from "@components/common/Type";
import { Character } from "@components/common/Type";
import { asyncSessionStorage } from "async-web-storage";
import axios from "axios";
import {
    CHAR_TABLE_VERSION_URL,
    CHAR_TABLE_GZ_URL,
    CHAR_TABLE_URL,
    CHAR_NAME_DICT_URL,
} from "src/constants";

export function charTableLocalStorageInit(): boolean {
    const [char, setChar] = useLocalStorage<CharacterTable>("character-table");
    const [name, setName] = useLocalStorage("name_dict");
    const [version, setVersion] = useLocalStorage<Version>("version");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function dbCheck() {
            const from_net = (await axios.get(CHAR_TABLE_VERSION_URL)).data;
            if (version === undefined) {
                setVersion(from_net);
            }
            await asyncSessionStorage.setItem("version", from_net);
            console.log("DBVersion in Local : ", version);
        }
        async function initDb() {
            const version_session = await asyncSessionStorage.getItem(
                "version",
            );
            console.log(version_session);
            if (
                version?.version === version_session.version &&
                version?.length === version_session.length
            ) {
                console.log("Correct DB");
                return;
            } else if (
                version?.version === version_session.version ||
                version?.length === version_session.length
            ) {
                const data = await gzDecompress(
                    CHAR_TABLE_GZ_URL,
                    CHAR_TABLE_URL,
                );
                setChar(data);
                const namedict = (await axios.get(CHAR_NAME_DICT_URL)).data;
                setName(namedict);
                console.log("Wrong DB Exists");
            } else {
                const data = await gzDecompress(
                    CHAR_TABLE_GZ_URL,
                    CHAR_TABLE_URL,
                );
                setChar(data);
                const namedict = (await axios.get(CHAR_NAME_DICT_URL)).data;
                setName(namedict);
                console.log("No Db, Init");
            }
        }
        setLoading(true);
        dbCheck().then(() => {
            initDb().then(() => {
                console.log("DB INIT OVER");
                setLoading(false);
            });
        });
    }, []);
    return loading;
}

export function useCharTableLocalStorage(name: string): Character | undefined {
    const [char, setChar] = useLocalStorage<CharacterTable>("character-table");
    const [data, setData] = useState<Character>();
    //const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function get() {
            //setLoading(true);
            if (char === undefined) {
                charTableLocalStorageInit();
            } else {
                const returnData = findName(char, name);
                setData(returnData);
            }
        }
        get().then(() => {
            //setLoading(false);
        });
    }, [name, char]);
    return data;
}

function findName(char: any, name: string) {
    if (char === undefined) {
        console.error("char undefined");
        return null;
    }
    for (const rarity of Object.keys(char)) {
        if (Object.keys(char[rarity]).includes(name)) {
            const value = char[rarity][name];
            console.log(value);
            value["rarity"] = rarity;
            return value;
        }

        //return char[rarity][name];
    }
}
