import { getItem, setItem } from "./functions";
import { DB_NAME } from "./db_name";
import axios from "axios";
import { MUSIC_SONGS_URL, MUSIC_SONG_URL } from "@constants/urls";
import { MUSIC_ALBUMS_URL } from "../../../constants/urls";

export async function getMusicDB() {
    return (await axios.get(MUSIC_SONGS_URL)).data;
}

export async function getAlbumDB() {
    return (await axios.get(MUSIC_ALBUMS_URL)).data;
}

export async function getMusicBlob(url: string) {
    await axios.get(url, { responseType: "blob" }).then((res) => {
        return new Blob([res.data], { type: res.headers["content-type"] });
    });
}

export async function getAlbumArtBlob(url: string) {
    await axios.get(url, { responseType: "blob" }).then((res) => {
        return new Blob([res.data], { type: res.headers["content-type"] });
    });
}