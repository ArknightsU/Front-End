import { useRecoilState } from "recoil";
import { GID } from "@recoil/atoms";

export const useGid: () => [string, { setGid: (str: string) => void }] = () => {
    const [id, setId] = useRecoilState(GID);
    const setGid = (str: string) => {
        setId(str);
    };
    return [id, { setGid }];
};
