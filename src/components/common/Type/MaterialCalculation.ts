export interface MaterialCalculation {
    name: string;
    upgrade: Array<boolean | null> | null;
    skill1: Array<boolean> | null;
    skill2: Array<boolean> | null;
    skill3: Array<boolean> | null;
    allSkill: Array<boolean> | null;
}
