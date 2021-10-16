import { atom } from "recoil";
import { Atoms } from "@recoil/constants";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const GID = atom({
    key: Atoms.GID,
    default: "",
    effects_UNSTABLE: [persistAtom],
});
