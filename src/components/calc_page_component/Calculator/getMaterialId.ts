import MaterialMap from "@public/json/common/akmaterial.json";

// DEPRECATED FUNCTION
// USE getMaterialObject.ts
export function getMaterialId(itemId: string): number {
    for (const materialObj of MaterialMap) {
        if (materialObj.itemId === itemId) {
            return materialObj.id;
        }
    }
    //console.log(itemId);
    return -1;
}
