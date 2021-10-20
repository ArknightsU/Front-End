import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const DBVersion = atom({
    key: Atoms.DBVersion,
    default: undefined,
});
