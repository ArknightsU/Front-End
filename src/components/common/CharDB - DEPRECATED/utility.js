import { gzDecompress } from "@components/common/GzDecompress";
import axios from "axios";
import db from "./indexDB.js";

async function saveNameDict(data) {
    if (data) {
        if (db.name_dict) db.name_dict.clear();
        var array = [];
        for (var rarity of Object.keys(data)) {
            for (var char of Object.keys(data[rarity])) {
                var value = data[rarity][char];
                array.push({ char: char, data: value });
            }
        }
        db.name_dict.bulkPut(array);
    }
}

async function saveDataInIndexDB(data) {
    if (data) {
        if (db.character_table) db.character_table.clear();
        for (var d of Object.keys(data)) {
            if (d === "limited" || d === "unobtainable") {
                continue;
            }
            var array = [];
            for (var char of Object.keys(data[d])) {
                var value = data[d][char];
                value["rarity"] = d; /*
                db.character_table.add({
                    char: char,
                    data: value,
                });*/
                array.push({ char: char, data: value });
            }
            db.character_table.bulkPut(array);
        }
    }
}

export async function getDataFromIndexDB(name) {
    //console.log("type of name : ", typeof name);
    //await waitUntil(() => getDataCount() > 0);
    if (name === undefined) {
        console.log("name undefined");
        return null;
    } else {
        const character_table = await db.character_table
            .where("char")
            .equals(name)
            .toArray();
        if (character_table && character_table.length > 0) {
            return character_table[0]["data"];
        }
        console.log("character table fail", character_table.length);
        return null;
    }
}

async function getDataCount() {
    const count = await db.character_table.count();
    return count;
}

async function saveVersionInIndexDB(data) {
    if (data) {
        if (db.data_version) db.data_version.clear();
        db.data_version.add({ data_version: "data_version", data }).then(() => {
            console.log("DB save Success");
        });
    }
}

async function getVersion() {
    const data_version = await db.data_version
        .where("data_version")
        .equals("data_version")
        .toArray();
    if (data_version && data_version.length > 0) {
        return data_version[0]["data"];
    }
    return null;
}

export async function getNameDict(name) {
    if (name === undefined) {
        return null;
    }
    const name_dict = await db.name_dict.where("char").equals(name).toArray();
    if (name_dict && name_dict.length > 0) {
        return name_dict[0]["data"];
    }
}

const json_url = "https://arknightsu.github.io/json/character_table.json";
const json_gz_url = "https://arknightsu.github.io/json/character_table.json.gz";
const json_version_url = "https://arknightsu.github.io/json/version.json";
const name_dict_url = "https://arknightsu.github.io/json/name_dict.json";
export async function DBInit(version, length) {
    if (!db.data_version) {
        console.error("no db version");
    }
    if (!db.name_dict) {
        console.error("no name dictionary");
    }
    if (!db.character_table) {
        console.error("no character db");
    }
    let db_version = await getVersion();
    let db_length = await getDataCount();
    let json_version = version;
    let json_length = length;
    if (version === undefined) {
        console.log("db-version", db_version);
        const from_internet = (await axios.get(json_version_url)).data;
        json_version = from_internet["version"];
        json_length = from_internet["length"];
    }
    if (db_version === null) {
        saveVersionInIndexDB(json_version);
        const data = await gzDecompress(json_gz_url, json_url);
        saveDataInIndexDB(data);
        const dict = (await axios.get(name_dict_url)).data;
        saveNameDict(dict);
        console.log("db not found");
    } else {
        if (
            Number(json_version) === Number(db_version) &&
            Number(json_length) === Number(db_length)
        ) {
            console.log("correct db exists");
            return;
        } else {
            saveVersionInIndexDB(json_version);
            const data = await gzDecompress(json_gz_url, json_url);
            saveDataInIndexDB(data);
            const dict = (await axios.get(name_dict_url)).data;
            saveNameDict(dict);
            console.log("wrong db exists");
        }
    }
}

export function isWindowDBSupported() {
    return window.indexedDB;
}
