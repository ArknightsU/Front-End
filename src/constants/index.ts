export const SERVER_URL_GACHA_POOLS =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/gacha/pools";
export const SERVER_URL_GACHA =
    "https://gacha-server-7vnjo7nhlq-du.a.run.app/v1/gacha";
export const GET_GACHA_API_URL = (
    count: number,
    code: number,
    stack: number,
): string => {
    return (
        SERVER_URL_GACHA + `?gacha_count=${count}&code=${code}&stack=${stack}`
    );
};
