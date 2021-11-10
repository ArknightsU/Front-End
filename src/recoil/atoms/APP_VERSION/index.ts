import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const APP_VERSION = atom({
    key: Atoms.APP_VERSION,
    default: "0.0.0",
});
