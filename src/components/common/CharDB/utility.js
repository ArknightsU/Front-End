import { gzDecompress } from "@components/common/GzDecompress";
import axios from "axios";
import db from "./indexDB.js";
import { useAsync } from "react-use";

async function saveDataInIndexDB(data) {
    if (data) {
        if (db.character_table) db.character_table.clear();
        for (var d of Object.keys(data)) {
            if (d === "limited" || d === "unobtainable") {
                continue;
            }
            for (var char of Object.keys(data[d])) {
                var value = data[d][char];
                value["rarity"] = d;
                db.character_table.add({
                    char: char,
                    data: value,
                });
            } /*
            db.character_table.add({
                rarity: d,
                chars: data[d],
            });*/
        } /*
        db.character_table
            .add({ character_table: "character_table", data })
            .then(() => {
                console.log("DB save Success");
            });*/
    }
}

export async function getDataFromIndexDB(name) {
    const character_table = await db.character_table
        .where("char")
        .equals(name)
        .toArray();
    if (character_table && character_table.length > 0) {
        return character_table[0]["data"];
    }
    return null;
}

export function getCharData(name) {
    const data = useAsync(async () => {
        return await getDataFromIndexDB(name);
    });
    return data;
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

const json_url = "https://arknightsu.github.io/json/character_table.json";
const json_gz_url = "https://arknightsu.github.io/json/character_table.json.gz";
const json_version_url = "https://arknightsu.github.io/json/version.json";
export async function DBInit(version) {
    let db_version = await getVersion();
    let json_version;
    if (version === undefined) {
        console.log("db-version", db_version);
        json_version = (await axios.get(json_version_url)).data["version"];
    } else {
        json_version = version;
    }
    if (db_version === null) {
        saveVersionInIndexDB(json_version);
        const data = await gzDecompress(json_gz_url, json_url);
        saveDataInIndexDB(data);
        console.log("db not found");
    } else {
        if (Number(json_version) === Number(db_version)) {
            console.log("correct db exists");
            return;
        } else {
            saveVersionInIndexDB(json_version);
            const data = await gzDecompress(json_gz_url, json_url);
            saveDataInIndexDB(data);
            console.log("wrong db exists");
        }
    }
}

export function isWindowDBSupported() {
    return window.indexedDB;
}
