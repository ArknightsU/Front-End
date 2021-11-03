/* eslint-disable @typescript-eslint/ban-ts-comment */
import { gzDecompress } from "@components";
import { CHAR_TABLE_URL, CHAR_TABLE_VERSION_URL } from "@constants";
import axios from "axios";
import { db } from "./db";
import { DB_NAME } from "./db_name";
import { CHAR_TABLE_GZ_URL, CHAR_NAME_DICT_URL } from "@constants";

export async function setItem(db_name: string, key: string, value: any) {
    await db(db_name).setItem(key, value);
}

export async function getItem(db_name: string, key: string) {
    return await db(db_name).getItem(key);
}

const REJECT = [
    "char_504_rguard",
    "char_505_rcast",
    "char_506_rmedic",
    "char_507_rsnipe",
    "char_508_aguard",
    "char_509_acast",
    "char_510_amedic",
    "char_511_asnipe",
];

async function setCharacterTableItems() {
    await db(DB_NAME.character_table).clear();
    const data = await gzDecompress(CHAR_TABLE_GZ_URL, CHAR_TABLE_URL);
    for (const rarity of Object.keys(data)) {
        if (rarity === "limited" || rarity === "unobtainable") {
            continue;
        }
        for (const char of Object.keys(data[rarity])) {
            if (REJECT.includes(char)) continue;
            const value = data[rarity][char];
            value["rarity"] = rarity;
            if (value["kr_name"] === "") {
                const name_dict = await getItem(DB_NAME.name_dict, char);
                // @ts-ignore
                for (const key of Object.keys(name_dict)) {
                    // @ts-ignore
                    value[key] = name_dict[key];
                }
            }
            await setItem(DB_NAME.character_table, char, value);
        }
    }
}

async function setDBVersion(net_version_data: any) {
    for (const key of Object.keys(net_version_data)) {
        await setItem(DB_NAME.db_version, key, net_version_data[key]);
    }
}

async function setNameDictItems() {
    const name_dict = (await axios.get(CHAR_NAME_DICT_URL)).data;
    for (const rarity of Object.keys(name_dict)) {
        for (const char of Object.keys(name_dict[rarity])) {
            await setItem(DB_NAME.name_dict, char, name_dict[rarity][char]);
        }
    }
}

async function getCharDBLength() {
    return (await db(DB_NAME.character_table).length()) + REJECT.length;
}

async function checkDBStatus(net_version: any) {
    const current_version = await getItem(DB_NAME.db_version, "version");
    const current_db_length = await getCharDBLength();
    if (current_version === null || current_db_length === 0) {
        return true;
    } else if (net_version["version"] !== current_version) {
        return true;
    } else if (net_version["length"] !== current_db_length) {
        return true;
    } else {
        return false;
    }
}

export async function initDB() {
    const net_version = (await axios.get(CHAR_TABLE_VERSION_URL)).data;
    const isDBNeedUpdate = await checkDBStatus(net_version);
    if (isDBNeedUpdate) {
        await setDBVersion(net_version);
        await setNameDictItems();
        await setCharacterTableItems();
    }
}

export async function forceInitDB() {
    const net_version = (await axios.get(CHAR_TABLE_VERSION_URL)).data;
    await setDBVersion(net_version);
    await setNameDictItems();
    await setCharacterTableItems();
}

export async function getAllCharacterKeys() {
    return await db(DB_NAME.character_table).keys();
}
