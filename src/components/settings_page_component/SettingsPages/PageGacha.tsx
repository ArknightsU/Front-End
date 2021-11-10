import { useSettings } from "@recoil/hooks";
import DisplayText from "../DisplayValues";
import { SettingSwitch } from "./SettingChild";

export function PageGacha(): JSX.Element {
    const [setting, settingFunc] = useSettings();
    const setCompactGacha = (v: boolean) => {
        settingFunc.change("GC_USE_COMPACT_GACHA", v);
    };
    const setGachaSaveLocal = (v: boolean) => {
        settingFunc.change("GC_SAVE_GACHA_DATA_IN_LOCAL", v);
    };
    return (
        <div className="w-auto h-auto flex flex-col">
            <div className="w-full h-auto flex flex-col gap-y-10">
                <div className="w-full h-auto">
                    <p className="font-bold text-2xl">
                        {DisplayText.gacha.meta.title}
                    </p>
                </div>
                <SettingSwitch
                    title={DisplayText.gacha.GC_USE_COMPACT_GACHA.title}
                    desciprtion={
                        DisplayText.gacha.GC_USE_COMPACT_GACHA.description
                    }
                    switchLabelLeft="풀사이즈"
                    switchLabelRight="컴팩트"
                    switchValue={setting.GC_USE_COMPACT_GACHA}
                    switchSetter={setCompactGacha}
                />
                <SettingSwitch
                    title={DisplayText.gacha.GC_SAVE_GACHA_DATA_IN_LOCAL.title}
                    desciprtion={
                        DisplayText.gacha.GC_SAVE_GACHA_DATA_IN_LOCAL
                            .description
                    }
                    switchLabelLeft="OFF"
                    switchLabelRight="ON"
                    switchValue={setting.GC_SAVE_GACHA_DATA_IN_LOCAL}
                    switchSetter={setGachaSaveLocal}
                />
            </div>
        </div>
    );
}
