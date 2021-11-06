import { GachaPool } from "../common/Type/GachaPool";
export function getAllfeaturedCharacters(pool: GachaPool): Array<string> {
    const list = [];
    for (const rarity of Object.keys(pool.featured)) {
        for (const char of pool.featured[rarity]) {
            list.push(char);
        }
    }
    return list;
}
