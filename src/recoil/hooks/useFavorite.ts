import { MusicFavorite } from "@recoil/atoms/MusicFavorite";
import { useRecoilState } from "recoil";
export const useFavorite: () => [
    Array<string>,
    { add: (newItem: string) => void; remove: (removeItem: string) => void },
] = () => {
    const [favorite, setFavorite] = useRecoilState(MusicFavorite);
    const add = (newItem: string) => {
        setFavorite([...favorite, newItem]);
    };
    const remove = (removeItem: string) => {
        setFavorite(favorite.filter((v: string) => v !== removeItem));
    };
    return [favorite, { add, remove }];
};
