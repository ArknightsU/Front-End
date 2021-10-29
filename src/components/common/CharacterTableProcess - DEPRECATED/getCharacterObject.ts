import CHAR_TABLE from "@public/json/characters/character_table.json";

export function getCharacterObject(charCode: string) {
    for (const rarity in Object.keys(CHAR_TABLE)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (Object.keys(CHAR_TABLE[rarity]).includes(charCode)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return CHAR_TABLE[rarity][charCode];
        }
    }
}
