export interface SettingsValueType {
    title: string;
    prev: string;
    menus: Array<string>;
}
export interface LanguagePackType {
    title: string;
    prev: string;
    menus: {
        [key: string]: string;
    };
    db: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    gacha: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    calc: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    music: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    lang: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    account: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    info: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
}
