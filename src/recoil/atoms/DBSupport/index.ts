import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const DBSupport = atom({
    key: Atoms.DBSupport,
    default: true,
});
