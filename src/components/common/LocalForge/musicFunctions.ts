import { getItem, setItem } from "./functions";
import { DB_NAME } from "./db_name";
import axios from "axios";
import {
    MUSIC_ALBUM_URL,
    MUSIC_SONGS_URL,
    MUSIC_SONG_URL,
    MUSIC_ALBUMS_URL,
    MUSIC_VERSION_URL,
} from "@constants/urls";
import { db } from "./db";

interface VersionData {
    version: string;
    songs_length: number;
    albums_length: number;
}
async function getVersion(): Promise<VersionData> {
    const data = (await axios.get(MUSIC_VERSION_URL)).data;
    console.log(data);
    return {
        version: data["version"],
        songs_length: data["songs_length"],
        albums_length: data["albums_length"],
    };
}

async function setVersion(version_data: any) {
    console.log(version_data);
    for (const keys of Object.keys(version_data)) {
        await setItem(DB_NAME.music_version, keys, version_data[keys]);
    }
}

/**
 * music db version checker
 * @returns boolean
 * true : don't need to update
 * false : need update
 */
async function checkVersion() {
    const localVersion = await getItem(DB_NAME.music_version, "version");
    const local_song_length = await db(DB_NAME.music_db).length();
    const local_album_length = await db(DB_NAME.album_db).length();
    const local_checker = [localVersion, local_song_length, local_album_length];
    if (local_checker.includes(null)) {
        const net_version = await getVersion();
        setVersion(net_version);
        return false;
    } else {
        const net_version = await getVersion();
        if (
            localVersion === net_version.version &&
            local_song_length === net_version.songs_length &&
            local_album_length === net_version.albums_length
        ) {
            return true;
        } else {
            setVersion(net_version);
            return false;
        }
    }
}

async function getMusicDB() {
    return (await axios.get(MUSIC_SONGS_URL)).data;
}

async function getAlbumDB() {
    return (await axios.get(MUSIC_ALBUMS_URL)).data;
}

async function setMusicDB() {
    const music_db = await getMusicDB();
    for (const music_obj of music_db.data.list) {
        await setItem(DB_NAME.music_db, music_obj["cid"], music_obj);
    }
}

async function setAlbumDB() {
    const album_db = await getAlbumDB();
    for (const album_obj of album_db.data) {
        await setItem(DB_NAME.album_db, album_obj["cid"], album_obj);
    }
}
export async function forceInitMusicDB() {
    const version = await getVersion();
    await setVersion(version);
    await setMusicDB();
    await setAlbumDB();
}

export async function initMusicDB() {
    if (await checkVersion()) return;
    else {
        await setMusicDB();
        await setAlbumDB();
    }
}

export async function getMusic(key: string) {
    const music = await getItem(DB_NAME.music_table, key);
    if (music === null) {
        const music_data = (await axios.get(MUSIC_SONG_URL(key))).data;
        await setItem(DB_NAME.music_table, key, music_data);
        return music_data;
    } else {
        return music;
    }
}
export async function getAlbum(key: string) {
    const album = await getItem(DB_NAME.album_table, key);
    if (album === null) {
        const album_data = (await axios.get(MUSIC_ALBUM_URL(key))).data;
        await setItem(DB_NAME.album_table, key, album_data);
        return album_data;
    } else {
        return album;
    }
}

export async function getMusicBlob(key: string) {
    const music = await getItem(DB_NAME.music_storage, key);
    if (music === null) {
        const music_data_url = (await getMusic(key)).data.sourceUrl;
        const data = await axios
            .get(music_data_url, { responseType: "blob" })
            .then((res) => {
                return new Blob([res.data], {
                    type: res.headers["content-type"],
                });
            });
        await setItem(DB_NAME.music_storage, key, data);
        return data;
    } else {
        return music;
    }
}

export async function getAlbumArtBlob(key: string) {
    const album = await getItem(DB_NAME.album_storage, key);
    if (album === null) {
        const album_data_url = (await getAlbum(key)).data.coverUrl;
        const data = await axios
            .get(album_data_url, { responseType: "blob" })
            .then((res) => {
                return new Blob([res.data], {
                    type: res.headers["content-type"],
                });
            });
        await setItem(DB_NAME.album_storage, key, data);
        return data;
    } else {
        return album;
    }
}

export async function getBigAlbumArtBlob(key: string) {
    const album = await getItem(DB_NAME.album_storage, key);
    if (album === null) {
        const album_data_url = (await getAlbum(key)).data.coverDeUrl;
        const data = await axios
            .get(album_data_url, { responseType: "blob" })
            .then((res) => {
                return new Blob([res.data], {
                    type: res.headers["content-type"],
                });
            });
        await setItem(DB_NAME.album_storage, key, data);
        return data;
    } else {
        return album;
    }
}

export async function getMusicKeys() {
    return await db(DB_NAME.music_db).keys();
}

export async function getAlubmKeys() {
    return await db(DB_NAME.album_db).keys();
}
