/* eslint-disable @typescript-eslint/ban-ts-comment */
import MaterialMap from "@public/json/common/akmaterial.json";
export function getMaterialObject(itemId: string): any {
    for (const materialObj of MaterialMap) {
        if (materialObj.itemId === itemId) {
            return materialObj;
        }
    }
    if (SKILL_BOOKS.includes(itemId)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return SKILL_BOOKS_OBJ[itemId];
    }
    return new Error("No such material");
}

export function getMaterialObjectByCNname(cn_name: string): any {
    for (const materialObj of MaterialMap) {
        if (materialObj.name_cn === cn_name) {
            return materialObj;
        }
    }
    for (const skillBook of Object.keys(SKILL_BOOKS_OBJ)) {
        // @ts-ignore
        if (SKILL_BOOKS_OBJ[skillBook].name_cn === cn_name) {
            // @ts-ignore
            return SKILL_BOOKS_OBJ[skillBook];
        }
    }

    return new Error("No such material");
}

const SKILL_BOOKS = ["3303", "3301", "3302"];
const SKILL_BOOKS_OBJ = {
    "3303": {
        id: "MTL_SKILL3",
        itemId: "3303",
        name_cn: "技巧概要·卷3",
        name_en: "Skill Summary - 3",
        name_jp: "アーツ学Ⅲ",
        name_kr: "스킬개론 제3권",
        name_tw: "",
        level: 3,
        source: {
            "R8-11": "Very Rare",
            "S5-9": "Very Rare",
        },
        madeof: { "技巧概要·卷2": 3 },
    },
    "3302": {
        id: "MTL_SKILL2",
        itemId: "3302",
        name_cn: "技巧概要·卷2",
        name_en: "Skill Summary - 2",
        name_jp: "アーツ学Ⅱ",
        name_kr: "스킬개론 제2권",
        name_tw: "",
        level: 2,
        source: {},
        madeof: {
            "技巧概要·卷1": 3,
        },
    },
    "3301": {
        id: "MTL_SKILL3",
        itemId: "3301",
        name_cn: "技巧概要·卷1",
        name_en: "Skill Summary - 1",
        name_jp: "アーツ学Ⅰ",
        name_kr: "스킬개론 제1권",
        name_tw: "",
        level: 1,
        source: {},
        madeof: {},
    },
};
