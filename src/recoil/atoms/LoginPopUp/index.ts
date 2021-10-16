import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const LoginPopUp = atom({
    key: Atoms.LoginPopUp,
    default: false,
});
