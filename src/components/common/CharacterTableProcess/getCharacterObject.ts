import CHAR_TABLE from "@public/json/characters/character_table.json";

export function getCharacterObject(charCode: string) {
    for (const rarity in Object.keys(CHAR_TABLE)) {
        if (Object.keys(CHAR_TABLE[rarity]).includes(charCode)) {
            return CHAR_TABLE[rarity][charCode];
        }
    }
}
