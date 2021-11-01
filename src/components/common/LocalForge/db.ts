import localForage from "localforage";
import { DB_NAME } from "./db_name";

const DB = "ARKNIGHTS_ONE";
const character_table = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.character_table,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const db_version = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.db_version,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const name_dict = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.name_dict,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const music_storage = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.music_storage,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const album_storage = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.album_storage,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const music_table = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.music_table,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const album_table = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.album_table,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const music_db = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.music_db,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const album_db = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.album_db,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
const music_version = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.music_version,
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
});
export const db = (key: string): LocalForage => {
    switch (key) {
        case DB_NAME.character_table:
            return character_table;
        case DB_NAME.db_version:
            return db_version;
        case DB_NAME.name_dict:
            return name_dict;
        case DB_NAME.music_storage:
            return music_storage;
        case DB_NAME.album_storage:
            return album_storage;
        case DB_NAME.music_table:
            return music_table;
        case DB_NAME.album_table:
            return album_table;
        case DB_NAME.album_db:
            return album_db;
        case DB_NAME.music_db:
            return music_db;
        case DB_NAME.music_version:
            return music_version;
        default:
            return localForage.createInstance({
                name: DB,
                storeName: key,
                driver: [
                    localForage.INDEXEDDB,
                    localForage.LOCALSTORAGE,
                    localForage.WEBSQL,
                ],
            });
    }
};
