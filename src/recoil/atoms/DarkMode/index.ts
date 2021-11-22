import { atom } from "recoil";
import { Atoms } from "@recoil/constants";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const DarkMode = atom({
    key: Atoms.DarkMode,
    default: false,
    effects_UNSTABLE: [persistAtom],
});
