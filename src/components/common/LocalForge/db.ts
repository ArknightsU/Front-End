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
const file_storage = localForage.createInstance({
    name: DB,
    storeName: DB_NAME.file_storage,
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
export const db = (key: string): LocalForage => {
    switch (key) {
        case DB_NAME.character_table:
            return character_table;
        case DB_NAME.db_version:
            return db_version;
        case DB_NAME.name_dict:
            return name_dict;
        case DB_NAME.file_storage:
            return file_storage;
        case DB_NAME.music_table:
            return music_table;
        default:
            return localForage.createInstance({ name: key });
    }
};
