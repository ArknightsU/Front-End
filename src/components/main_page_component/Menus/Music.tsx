/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import { menuStyle } from "./common";
import "react-h5-audio-player/lib/styles.css";
import {
    CustomImage,
    getMusicKeys,
    initMusicDB,
    useBigAlbumArtBlob,
    useMusicArray,
    useMusicDB,
} from "@components";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { useFavorite } from "@recoil/hooks";
import { useRecoilState } from "recoil";
import { CurrentPlayList } from "@recoil/atoms";
import { PlayList } from "./MusicComp/PlayList";
import { MusicPlayer } from "./MusicComp/MusicPlayer";

// TODO : MUSIC PLAYER
interface MusicProps {
    data: string;
}
export function Music(): JSX.Element {
    const [fav, setFav] = useState(false);
    const [currentPlayList, setCurrentPlayList] =
        useRecoilState(CurrentPlayList);
    const [playListAll, setPlayListAll] = useState<string[]>([]);
    const [playListFavorite, favoriteFunctions] = useFavorite();
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingText, setLoadingText] = useState<string>("DB 초기 설정 중");
    const [current, setCurrent] = useState<number>(0);
    console.log(playListAll);
    const playList = currentPlayList ? playListFavorite : playListAll;
    // @ts-ignore
    console.log(playList);
    const [currentMusic, musicLoading] = useMusicDB(playList[current]);
    console.log(currentMusic);
    // @ts-ignore
    const [imageBlob, imageLoading] = useBigAlbumArtBlob(currentMusic.albumCid);
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        getMusicKeys().then((value) => {
            setPlayListAll(value);
        });
    }, [loading]);
    useEffect(() => {
        setCurrent(0);
    }, [fav]);
    useEffect(() => {
        initMusicDB().then(() => {
            setLoading(false);
        });
    }, []);
    useEffect(() => {
        // @ts-ignore
        console.log(typeof imageBlob);
        if (typeof imageBlob === "object") {
            setImageUrl(imageLoading ? "" : URL.createObjectURL(imageBlob));
            console.log("IS?");
        }
    }, [imageLoading]);
    console.log("INFINITE");
    return (
        <div className={menuStyle}>
            <div className="w-full h-full flex flew-row justify-center items-center">
                {
                    // PlayList Component
                }
                <div className="w-1/2 h-full rounded-lg overflow-hidden shadow-br">
                    {loading ? (
                        <div className="w-fuill h-full flex flex-col justify-center items-center">
                            <EclipseSpinner />
                            <p>{loadingText}</p>
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            {playListAll.length === 0 ? (
                                <div className="w-fuill h-full flex flex-col justify-center items-center">
                                    <EclipseSpinner />
                                    <p>{loadingText}</p>
                                </div>
                            ) : (
                                <PlayList
                                    fav={fav}
                                    setFav={setFav}
                                    currentPlayList={currentPlayList}
                                    setCurrentPlayList={setCurrentPlayList}
                                    // @ts-ignore
                                    playListAll={playListAll}
                                    playListFavorite={playListFavorite}
                                    playListFavoriteFunction={favoriteFunctions}
                                    current={current}
                                    setCurrent={setCurrent}
                                />
                            )}
                        </div>
                    )}
                </div>
                {
                    // Music Player Component
                }
                <div className="w-1/2 h-full bg-gray-200 bg-opacity-70 rounded-lg ml-2 shadow-br">
                    {loading ? (
                        <div className="w-fuill h-full flex flex-col justify-center items-center overflow-hidden">
                            <EclipseSpinner />
                            <p>{loadingText}</p>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-end">
                            <div className="w-full flex-grow relative items-end flex">
                                <div className="absolute w-full h-full rounded-t-lg bg-black"></div>
                                <div className="w-full h-full relative flex justify-center items-center">
                                    {imageLoading || imageUrl === "" ? (
                                        <EclipseSpinner />
                                    ) : (
                                        <CustomImage src={imageUrl} />
                                    )}
                                </div>
                            </div>
                            <MusicPlayer
                                // @ts-ignore
                                playList={
                                    currentPlayList
                                        ? playListFavorite
                                        : playListAll
                                }
                                current={current}
                                setCurrent={setCurrent}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
