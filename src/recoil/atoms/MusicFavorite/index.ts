import { atom } from "recoil";
import { Atoms } from "@recoil/constants";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const MusicFavorite = atom({
    key: Atoms.MusicFavorite,
    default: [],
    effects_UNSTABLE: [persistAtom],
});
