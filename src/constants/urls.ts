export const SERVER_URL_GACHA_POOLS =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/gacha/pools";
export const SERVER_URL_GACHA =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/gacha";
export const GET_GACHA_API_URL = (count: number, id: string): string => {
    return SERVER_URL_GACHA + `?gacha_count=${count}&id=${id}`;
};
export const SERVER_URL_RESET_STACK =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/gacha/reset";

export const CHAR_TABLE_URL =
    "https://static2.arknights.one/json/character_table.json";
export const CHAR_TABLE_GZ_URL =
    "https://static2.arknights.one/json/character_table.json.gz";
export const CHAR_TABLE_VERSION_URL =
    "https://static2.arknights.one/json/version.json";
export const CHAR_NAME_DICT_URL =
    "https://static2.arknights.one/json/name_dict.json";
export const SERVER_STATUS_URL =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/health";

// music
export const MUSIC_SONGS_URL =
    "https://static2.arknights.one/json/music/songs.json";
export const MUSIC_ALBUMS_URL =
    "https://static2.arknights.one/json/music/albums.json";
export const MUSIC_SONG_URL = (song_number: string): string => {
    return `https://proxy.kanadetc.workers.dev/?https://monster-siren.hypergryph.com/api/song/${song_number}`;
};
export const MUSIC_ALBUM_URL = (album: string): string => {
    return `https://static2.arknights.one/json/music/album/${album}.json`;
};
export const MUSIC_VERSION_URL =
    "https://static2.arknights.one/json/music/version.json";
