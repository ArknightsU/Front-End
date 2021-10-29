import MaterialMap from "@public/json/common/akmaterial.json";
export function getMaterialId(itemId: string): number {
    for (const materialObj of MaterialMap) {
        if (materialObj.itemId === itemId) {
            return materialObj.id;
        }
    }
    return -1;
}
