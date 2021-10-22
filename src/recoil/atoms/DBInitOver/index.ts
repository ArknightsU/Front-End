import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const DBInitOver = atom({
    key: Atoms.DBInitOver,
    default: false,
});
