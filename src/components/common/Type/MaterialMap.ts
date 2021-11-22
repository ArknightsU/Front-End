export interface MaterialMap {
    [key: string]: MaterialMapChild;
}

export interface MaterialMapChild {
    count: number;
    convert: number;
    type: string;
}
