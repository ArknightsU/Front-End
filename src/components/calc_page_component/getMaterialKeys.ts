import { MaterialCalculation } from "@components/common";

/**
 * @param focus Array of MaterialCalculation that contains formulas of processing
 * @returns Material itemIds array
 */
export function getMaterialKeys(focus: MaterialCalculation[]): Array<string> {
    const names = [];
    for (const content of focus) {
        names.push(content.name);
    }
    return names;
}
