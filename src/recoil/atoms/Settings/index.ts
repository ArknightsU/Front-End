import { atom } from "recoil";
import { Atoms } from "@recoil/constants";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const Settings = atom<SettingsStructure>({
    key: Atoms.Settings,
    default: {
        USE_COMPACT_GACHA: true,
        SAVE_GACHA_DATA_IN_LOCAL: false,
    },
    effects_UNSTABLE: [persistAtom],
});

export interface SettingsStructure {
    USE_COMPACT_GACHA: boolean;
    SAVE_GACHA_DATA_IN_LOCAL: boolean;
}

export type SETTING_KEYS = keyof SettingsStructure;
