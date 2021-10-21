import { useRecoilValue } from "recoil";
import { DBSupport } from "@recoil/atoms";
import { getDataFromIndexDB } from "@components/common/CharDB";
import { gzDecompress } from "@components/common";
import { useCharTableLocalStorage } from "./useCharTableLocalStorage";
import { useEffect, useState } from "react";

export function useCharTable(name: string) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const DBSupported = useRecoilValue(DBSupport);
    useEffect(() => {
        async function get() {
            try {
                if (!DBSupported) {
                    const value = useCharTableLocalStorage(name);
                    setData(value);
                } else {
                    getDataFromIndexDB();
                    const value = await getDataFromIndexDB(name);
                    setData(value);
                }
            } catch (e) {
                return;
            }
        }
        get();
    }, [name]);
    return [data, loading];
}
