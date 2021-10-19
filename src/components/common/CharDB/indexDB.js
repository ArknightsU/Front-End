import Dexie from "dexie";

const db = new Dexie("Character_Table");

db.version(1).stores({
    character_table: "++char",
    data_version: "data_version",
});

export default db;
