const DEV_SERVER_URL = "https://gacha-server-7vnjo7nhlq-du.a.run.app";
const SERVER_URL = "https://servermanager-7vnjo7nhlq-du.a.run.app";

export const SERVER_URL_GACHA_POOLS = SERVER_URL + "/v1/gacha/pools";
export const SERVER_URL_GACHA = SERVER_URL + "/v1/gacha";
export const GET_GACHA_API_URL = (count: number, id: string): string => {
    return SERVER_URL_GACHA + `?gacha_count=${count}&id=${id}`;
};
export const SERVER_URL_RESET_STACK = SERVER_URL + "/v1/gacha/reset";

export const SERVER_URL_GACHA_STATISTICS = (id: string): string => {
    return SERVER_URL + `/v1/statistic/pool?id=${id}`;
};
export const SERVER_URL_GACHA_ALL = SERVER_URL + "/v1/statistic/total";

export const SERVER_STATUS_URL = SERVER_URL + "/v1/health";

//DEV
export const DEV_SERVER_URL_GACHA_POOLS = DEV_SERVER_URL + "/v1/gacha/pools";
export const DEV_SERVER_URL_GACHA = DEV_SERVER_URL + "/v1/gacha";
export const DEV_GET_GACHA_API_URL = (count: number, id: string): string => {
    return DEV_SERVER_URL_GACHA + `?gacha_count=${count}&id=${id}`;
};
export const DEV_SERVER_URL_RESET_STACK = DEV_SERVER_URL + "/v1/gacha/reset";

export const DEV_SERVER_URL_GACHA_STATISTICS = (id: string): string => {
    return DEV_SERVER_URL + `/v1/statistic/pool?id=${id}`;
};
export const DEV_SERVER_URL_GACHA_ALL = DEV_SERVER_URL + "/v1/statistic/total";
export const DEV_SERVER_STATUS_URL = DEV_SERVER_URL + "/v1/health";
// DEV END

export const CHAR_TABLE_URL =
    "https://static2.arknights.one/json/character_table.json";
export const CHAR_TABLE_GZ_URL =
    "https://static2.arknights.one/json/character_table.json.gz";
export const CHAR_TABLE_VERSION_URL =
    "https://static2.arknights.one/json/version.json";
export const CHAR_NAME_DICT_URL =
    "https://static2.arknights.one/json/name_dict.json";

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
