import { GachaPool } from "../common/Type/GachaPool";
/**
 * @param pool Gacha Pool data
 * @returns featured character's code array
 */
export function getAllfeaturedCharacters(pool: GachaPool): Array<string> {
    const list = [];
    for (const rarity of Object.keys(pool.featured)) {
        for (const char of pool.featured[rarity]) {
            list.push(char);
        }
    }
    return list;
}
