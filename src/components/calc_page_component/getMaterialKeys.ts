import { MaterialCalculation } from "@components/common";

export function getMaterialKeys(focus: MaterialCalculation[]): Array<string> {
    const names = [];
    for (const content of focus) {
        names.push(content.name);
    }
    return names;
}
