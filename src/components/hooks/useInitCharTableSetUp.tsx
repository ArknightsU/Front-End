import { DBInit, isWindowDBSupported } from "@components/common/CharDB - DEPRECATED";
import { DBSupport, DBVersion } from "@recoil/atoms";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

export function useInitCharTableSetUp() {
    const [loading, setLoading] = useState(false);
    const [dbVersion, setDbVersion] = useRecoilState(DBVersion);
    const [dbStat, setDbStat] = useRecoilState(DBSupport);
    useEffect(() => {
        async function set() {
            setLoading(true);
            if (dbVersion === undefined) {
                const json_version_url =
                    "https://arknightsu.github.io/json/version.json";
                const from_net = (await axios.get(json_version_url)).data;
                setDbVersion(from_net);
            }
        }
        set().then(() => {
            if (isWindowDBSupported()) {
                if (dbVersion === undefined) {
                    setLoading(false);
                    return;
                }
                DBInit(dbVersion["version"], dbVersion["length"]);
                setLoading(false);
            } else {
                setDbStat(false);
                setLoading(false);
            }
        });
    }, [dbVersion]);
    return loading;
}
