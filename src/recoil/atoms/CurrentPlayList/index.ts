import { atom } from "recoil";
import { Atoms } from "@recoil/constants";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const CurrentPlayList = atom<boolean>({
    key: Atoms.CurrentPlayList,
    default: false,
    effects_UNSTABLE: [persistAtom],
});
