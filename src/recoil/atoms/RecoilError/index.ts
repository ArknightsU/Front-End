import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const RecoilError = atom({
    key: Atoms.Error,
    default: false,
});
