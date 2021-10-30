import MaterialMap from "@public/json/common/akmaterial.json";
export function getMaterialObject(itemId: string): any {
    for (const materialObj of MaterialMap) {
        if (materialObj.itemId === itemId) {
            return materialObj;
        }
    }
    return new Error("No such material");
}
