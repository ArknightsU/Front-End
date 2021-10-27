import { Character } from "./Character";
export type CharacterTable = {
    [key in "six" | "five" | "four" | "three" | "two" | "one"]: Rarity;
} & {
    unobtainable: Array<string>;
    limited: Array<string>;
};

interface Rarity {
    [key: string]: Character;
}

interface Dictionary<T> {
    [key: string]: T;
}
