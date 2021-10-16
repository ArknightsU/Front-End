import { useRecoilState } from "recoil";
import { LoginPopUp } from "@recoil/atoms";

export const useLoginPopUp: () => [boolean, { toggleLoginPopUp: () => void }] =
    () => {
        const [login, setLogin] = useRecoilState(LoginPopUp);
        const toggleLoginPopUp = () => {
            setLogin(!login);
        };
        return [login, { toggleLoginPopUp }];
    };
