/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRecoilValue } from "recoil";
import { DBInitOver, DBSupport } from "@recoil/atoms";
import { getDataFromIndexDB, getNameDict } from "@components/common/CharDB - DEPRECATED";
import { useCharTableLocalStorage } from "./useCharTableLocalStorage";
import { useCharTableSessionStorage } from "./useCharTableSessionStorage";
import { useEffect, useState } from "react";

export function useCharNameDict(name: string) {
    const [data, setData] = useState({});
    const [nullChecker, setNullChecker] = useState(false);
    useEffect(() => {
        async function get() {
            const value = await getNameDict(name);
            if (value === null) {
                setNullChecker(!nullChecker);
            } else {
                setData(value);
            }
        }
        get();
    }, [name, nullChecker]);
    return data;
}

export function useCharTable(name: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [nullChecker, setNullChekcer] = useState(false);
    const DBSupported = useRecoilValue(DBSupport);
    const isDBInitOver = useRecoilValue(DBInitOver);
    useEffect(() => {
        async function get() {
            if (!DBSupported) {
                const value = useCharTableLocalStorage(name);
                // @ts-ignore
                setData(value);
            } else {
                //getDataFromIndexDB();
                try {
                    //console.log("DB INIT OVER");
                    // eslint-disable-next-line no-constant-condition

                    const value = await getDataFromIndexDB(name);
                    //console.log("DB Value", value);
                    if (value === null) {
                        console.error("NULL DETECTED");
                        setNullChekcer(!nullChecker);
                    } else {
                        if (value["kr_name"] === "") {
                            const nameDict = await getNameDict(name);
                            for (const key of Object.keys(nameDict)) {
                                value[key] = nameDict[key];
                            }
                        }
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
        get().then(() => {
            setLoading(false);
        });
    }, [name, isDBInitOver, nullChecker]);
    return [data, loading];
}
