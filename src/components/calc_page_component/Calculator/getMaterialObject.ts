/* eslint-disable @typescript-eslint/ban-ts-comment */
import MaterialMap from "@public/json/common/item_table.json";
import BuildingMap from "@public/json/common/building_data.json";

/**
 * Get Material Object from Maps
 * @param itemId material's item identification string
 * @returns Material's information Object
 */
export function getMaterialObject(itemId: string): any {
    // @ts-ignore
    return MaterialMap[itemId];
}

/**
 * @param type Type of material processing only become "MANUFACTURE" | ".."
 * @param formulaId Number of formula defined inside of material object
 * @returns Material formula object
 */
export function getProcess(type: string, formulaId: string) {
    if (type === "MANUFACTURE") {
        // @ts-ignore
        return BuildingMap.manufactFormulas[formulaId].costs;
    } else {
        // @ts-ignore
        return BuildingMap.workshopFormulas[formulaId].costs;
    }
}
