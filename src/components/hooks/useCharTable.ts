import { useRecoilValue } from "recoil";
import { DBInitOver, DBSupport } from "@recoil/atoms";
import { getDataFromIndexDB } from "@components/common/CharDB";
import { gzDecompress } from "@components/common";
import { useCharTableLocalStorage } from "./useCharTableLocalStorage";
import { useCharTableSessionStorage } from "./useCharTableSessionStorage";
import { useEffect, useState } from "react";
import { waitUntil } from "async-wait-until";

export function useCharTable(name: string) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [nullChecker, setNullChekcer] = useState(false);
    const DBSupported = useRecoilValue(DBSupport);
    const isDBInitOver = useRecoilValue(DBInitOver);
    useEffect(() => {
        async function get() {
            if (!DBSupported) {
                const value = useCharTableLocalStorage(name);
                setData(value);
            } else {
                //getDataFromIndexDB();
                try {
                    console.log("DB INIT OVER");
                    // eslint-disable-next-line no-constant-condition

                    const value = await getDataFromIndexDB(name);
                    console.log("DB Value", value);
                    if (value === null) {
                        console.error("NULL DETECTED");
                        setNullChekcer(!nullChecker);
                    } else {
                        setData(value);
                    }
                } catch (e) {
                    console.log("catch call", e);
                    const value = useCharTableSessionStorage(name);
                    console.log("session value", value);
                    setData(value);
                }
            }
        }
        get();
    }, [name, isDBInitOver, nullChecker]);
    return [data, loading];
}
