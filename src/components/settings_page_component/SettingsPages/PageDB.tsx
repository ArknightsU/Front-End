/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SettingButton, SettingVersion } from "./SettingChild";
import DisplayText from "../DisplayValues";
import { useEffect, useRef, useState } from "react";
import {
    DB_NAME,
    forceInitDB,
    forceInitMusicDB,
    getItem,
    resetBigAlbumBlob,
    resetMusicBlob,
} from "@components/common";
import axios from "axios";
import { CHAR_TABLE_VERSION_URL, MUSIC_VERSION_URL } from "@constants";

export function PageDB(): JSX.Element {
    const [popup, setPopup] = useState(false);
    const [desc, setDesc] = useState("");
    // char version
    const [cvLoading, setCvLoading] = useState(false);
    const [charCurVersion, setCharCurVersion] = useState("");
    const [charLatVersion, setCharLatVersion] = useState("");
    const getLatestVersion = () => {
        setCvLoading(true);
        axios
            .get(CHAR_TABLE_VERSION_URL)
            .then((res) => {
                setCharLatVersion(res.data.version);
                setCvLoading(false);
            })
            .catch((res) => {
                setCharLatVersion("에러가 발생했습니다. 다시 시도해주세요.");
                setCvLoading(false);
            });
    };
    useEffect(() => {
        setCvLoading(true);
        async function init() {
            const current_version = await getItem(
                DB_NAME.db_version,
                "version",
            );
            // @ts-ignore
            setCharCurVersion(current_version);
        }
        init().then(() => {
            setCvLoading(false);
        });
    }, []);

    // char reset
    const [cdloading, setCdLoading] = useState(false);
    const [charDBToggle, setCharDBToggle] = useState(false);
    const isFirstRenderCharReset = useRef(false);
    useEffect(() => {
        if (!isFirstRenderCharReset.current) {
            isFirstRenderCharReset.current = true;
            return;
        }
        async function set() {
            setCdLoading(true);
            await forceInitDB();
        }
        set().then(() => {
            setCdLoading(false);
        });
    }, [charDBToggle]);
    // music version
    const [mvLoading, setMvLoading] = useState(false);
    const [musicCurVersion, setMusicCurVersion] = useState("");
    const [musicLatVersion, setMusicLatVersion] = useState("");
    const getMusicLatestVersion = () => {
        setMvLoading(true);
        axios
            .get(MUSIC_VERSION_URL)
            .then((res) => {
                setMusicLatVersion(res.data.version);
                setMvLoading(false);
            })
            .catch((res) => {
                setMusicLatVersion("에러가 발생했습니다. 다시 시도해주세요.");
                setMvLoading(false);
            });
    };
    useEffect(() => {
        async function init() {
            setMvLoading(true);
            const current_version = await getItem(
                DB_NAME.music_version,
                "version",
            );
            // @ts-ignore
            setMusicCurVersion(current_version);
        }
        init().then(() => {
            setMvLoading(false);
        });
    }, []);

    // music reset
    const [mrLoading, setMrLoading] = useState(false);
    const [musicDBToggle, setMusicDBToggle] = useState(false);
    const isFirstRenderMusicReset = useRef(false);
    useEffect(() => {
        if (!isFirstRenderMusicReset.current) {
            isFirstRenderMusicReset.current = true;
            return;
        }
        async function set() {
            setMrLoading(true);
            await forceInitMusicDB();
        }
        set().then(() => {
            setMrLoading(false);
        });
    }, [musicDBToggle]);

    // music blob reset
    const [mbLoading, setMbLoading] = useState(false);
    const [musicBlobToggle, setMusicBlobToggle] = useState(false);
    const isFirstRenderMusicBlobReset = useRef(false);
    useEffect(() => {
        if (!isFirstRenderMusicBlobReset.current) {
            isFirstRenderMusicBlobReset.current = true;
            return;
        }
        async function set() {
            setMbLoading(true);
            await resetMusicBlob();
        }
        set().then(() => {
            setMbLoading(false);
        });
    }, [musicBlobToggle]);

    // album blob reset
    const [abLoading, setAbLoading] = useState(false);
    const [albumBlobToggle, setAlbumBlobToggle] = useState(false);
    const isFirstRenderAlbumBlobReset = useRef(false);
    useEffect(() => {
        if (!isFirstRenderAlbumBlobReset.current) {
            isFirstRenderAlbumBlobReset.current = true;
            return;
        }
        async function set() {
            setAbLoading(true);
            await resetBigAlbumBlob();
        }
        set().then(() => {
            setAbLoading(false);
        });
    }, [albumBlobToggle]);
    return (
        <div className="relative w-full h-auto flex flex-col gap-y-10">
            <div className="w-full h-auto flex flex-col gap-y-10">
                <SettingVersion
                    title={DisplayText.db.DB_CHAR_VERSION_CHECK.title}
                    desciprtion={
                        DisplayText.db.DB_CHAR_VERSION_CHECK.description
                    }
                    onClick={getLatestVersion}
                    currentVersion={charCurVersion}
                    latestVersion={charLatVersion}
                    loading={cvLoading}
                />
                <SettingButton
                    title={DisplayText.db.DB_CHAR_FORCE_UPDATE.title}
                    desciprtion={
                        DisplayText.db.DB_CHAR_FORCE_UPDATE.description
                    }
                    onClick={() => {
                        setCharDBToggle((prev) => !prev);
                    }}
                    buttonText="재설정"
                    loading={cdloading}
                />
                <SettingVersion
                    title={DisplayText.db.DB_MUSIC_VERSION_CHECK.title}
                    desciprtion={
                        DisplayText.db.DB_MUSIC_VERSION_CHECK.description
                    }
                    onClick={getMusicLatestVersion}
                    currentVersion={musicCurVersion}
                    latestVersion={musicLatVersion}
                    loading={mvLoading}
                />
                <SettingButton
                    title={DisplayText.db.DB_MUSIC_FORCE_UPDATE.title}
                    desciprtion={
                        DisplayText.db.DB_MUSIC_FORCE_UPDATE.description
                    }
                    onClick={() => {
                        setMusicDBToggle((prev) => !prev);
                    }}
                    buttonText="재설정"
                    loading={mrLoading}
                />
                <SettingButton
                    title={DisplayText.db.DB_MUSIC_RESET.title}
                    desciprtion={DisplayText.db.DB_MUSIC_RESET.description}
                    onClick={() => {
                        setMusicBlobToggle((prev) => !prev);
                    }}
                    buttonText="삭제"
                    loading={mbLoading}
                />
                <SettingButton
                    title={DisplayText.db.DB_ALBUM_RESET.title}
                    desciprtion={DisplayText.db.DB_ALBUM_RESET.description}
                    onClick={() => {
                        setAlbumBlobToggle((prev) => !prev);
                    }}
                    buttonText="삭제"
                    loading={abLoading}
                />
            </div>
        </div>
    );
}
