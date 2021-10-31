export const SERVER_URL_GACHA_POOLS =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/gacha/pools";
export const SERVER_URL_GACHA =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/gacha";
export const GET_GACHA_API_URL = (
    count: number,
    code: number,
    stack: number,
): string => {
    return SERVER_URL_GACHA + `?gacha_count=${count}&code=${code}`;
};

export const CHAR_TABLE_URL =
    "https://arknightsu.github.io/json/character_table.json";
export const CHAR_TABLE_GZ_URL =
    "https://arknightsu.github.io/json/character_table.json.gz";
export const CHAR_TABLE_VERSION_URL =
    "https://arknightsu.github.io/json/version.json";
export const CHAR_NAME_DICT_URL =
    "https://arknightsu.github.io/json/name_dict.json";
export const SERVER_STATUS_URL =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/health";
