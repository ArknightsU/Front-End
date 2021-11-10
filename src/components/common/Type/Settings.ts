export interface SettingsValueType {
    title: string;
    reset: string;
    menus: Array<string>;
}
export interface LanguagePackType {
    title: string;
    reset: string;
    menus: {
        [key: string]: string;
    };
    db: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
}
