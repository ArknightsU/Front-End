/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SETTING_KEYS, Settings, SettingsStructure } from "@recoil/atoms";
import { useRecoilState } from "recoil";

export const useSettings: () => [
    SettingsStructure,
    { change: (key: SETTING_KEYS, value: any) => void },
] = () => {
    const [settings, setSettings] = useRecoilState(Settings);
    const change = (key: SETTING_KEYS, value: any) => {
        const newSettings: SettingsStructure = Object.assign({}, settings);
        newSettings[key] = value;
        setSettings(newSettings);
    };
    return [settings, { change }];
};
