import SettingValue from "./json/SettingsValue.json";
import LanguagePack from "./json/Settings_ko.json";
import { SettingsValueType, LanguagePackType } from "../common/Type/Settings";

const returner: { key: SettingsValueType; value: LanguagePackType } = {
    key: SettingValue,
    value: LanguagePack,
};
const lp: LanguagePackType = LanguagePack;
export default lp;
