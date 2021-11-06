export interface GachaPool {
    code: number;
    featured: {
        [key: string]: Array<string>;
    };
    id: string;
    name: string;
    type: "featured" | "limited";
}
