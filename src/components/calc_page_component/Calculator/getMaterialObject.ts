/* eslint-disable @typescript-eslint/ban-ts-comment */
import MaterialMap from "@public/json/common/item_table.json";
import BuildingMap from "@public/json/common/building_data.json";

export function getMaterialObject(itemId: string): any {
    // @ts-ignore
    return MaterialMap[itemId];
}

export function getProcess(type: string, formulaId: string) {
    if (type === "MANUFACTURE") {
        // @ts-ignore
        return BuildingMap.manufactFormulas[formulaId].costs;
    } else {
        // @ts-ignore
        return BuildingMap.workshopFormulas[formulaId].costs;
    }
}
