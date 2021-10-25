export interface Character {
    allSkillLvlup: Array<SkillLvlupCost>;
    appellation: string;
    cn_name: string;
    displayNumber: string;
    en_name: string;
    evolveCost: EvolveCost;
    groupId: string;
    jp_name: string;
    kr_name: string;
    nationId: string;
    profession:
        | "SNIPER"
        | "SPECIAL"
        | "WARRIOR"
        | "TANK"
        | "CASTER"
        | "SUPPORT"
        | "MEDIC"
        | "PIONEER";
    skillLvlup: Array<SkillLvlup>;
    skills: Array<string>;
    subProfessionId: string;
    teamId: string;
}

interface SkillLvlupCost {
    lvlUpCost: Array<Cost>;
}

interface Cost {
    id: string;
    count: number;
    type: "MATERIAL";
}

interface EvolveCost {
    evolveCost: Array<Cost>;
}

interface SkillLvlup {
    levelUpCost: Array<Cost>;
    lvlUpTime: number;
    unlockCond: { phase: number; level: number };
}
