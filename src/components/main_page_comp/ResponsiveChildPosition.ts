export interface ResponsiveChildPosition {
    default?: Positions[] | Array<any>;
    sm?: Positions[] | Array<any>;
    md?: Positions[] | Array<any>;
    lg?: Positions[] | Array<any>;
    xl?: Positions[] | Array<any>;
    xxl?: Positions[] | Array<any>;
}

export class Positions {
    col_start: number;
    col_end: number;
    row_start: number;
    row_end: number;
    constructor(
        col_start: number,
        col_end: number,
        row_start: number,
        row_end: number,
    ) {
        this.col_start = col_start;
        this.col_end = col_end;
        this.row_start = row_start;
        this.row_end = row_end;
    }
}
