/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import { menuStyle } from "./common";
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
    // 즐겨찾기를 보는지 안보는지
    const [fav, setFav] = useState(false);
    // 실제 현재 재생하고 있는 재생목록을 결정
    const [currentPlayList, setCurrentPlayList] =
        useRecoilState(CurrentPlayList);
    // 전체 재생목록 state
    const [playListAll, setPlayListAll] = useState<string[]>([]);
    // 즐겨찾기 재생목록 state
    // Recoil-Persist 로 관리
    const [playListFavorite, favoriteFunctions] = useFavorite();
    // loading state for initial state
    // changed by init() render useEffect function
    const [loading, setLoading] = useState<boolean>(true);
    // current number in arrays
    const [current, setCurrent] = useState<number>(0);
    // defines playList
    const playList = currentPlayList ? playListFavorite : playListAll;
    // defines current play music
    // @ts-ignore
    const [currentMusic, musicLoading] = useMusicDB(playList[current]);
    // Album Image Blob and Url
    // @ts-ignore
    const [imageBlob, imageLoading] = useBigAlbumArtBlob(currentMusic.albumCid);
    const [imageUrl, setImageUrl] = useState("");
    // if loading state changes, getMusic keys
    useEffect(() => {
        getMusicKeys().then((value) => {
            setPlayListAll(value);
        });
    }, [loading]);
    // if current play list changed, set music number to 0
    useEffect(() => {
        setCurrent(0);
    }, [currentPlayList]);
    // when render, init music db and set loading to false
    useEffect(() => {
        initMusicDB().then(() => {
            setLoading(false);
        });
    }, []);
    // if image loading finished, set object url
    useEffect(() => {
        // @ts-ignore
        if (typeof imageBlob === "object") {
            setImageUrl(imageLoading ? "" : URL.createObjectURL(imageBlob));
        }
    }, [imageLoading]);
    return (
        <div className={menuStyle}>
            <div className="w-full h-full flex flew-row justify-center items-center">
                {
                    // PlayList Component
                }
                <div className="w-1/2 h-full rounded-lg shadow-br">
                    {loading ? (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <EclipseSpinner />
                            <p>{"재생 목록 초기화 중"}</p>
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            {playListAll.length === 0 ? (
                                <div className="w-fuill h-full flex flex-col justify-center items-center">
                                    <EclipseSpinner />
                                    <p>{"재생 목록 로딩 중"}</p>
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
                <div className="w-1/2 h-full relative bg-gray-200 bg-opacity-70 rounded-lg ml-2 shadow-br">
                    <div className="w-24 h-3 absolute flex justify-start items-center bg-red-700 z-10 -left-1 -top-1 opacity-0 md:opacity-100">
                        <p className="font-ibm-mono font-bold text-xxs text-white ml-1 -top-5 -left-2 uppercase">
                            {"Music player_"}
                        </p>
                    </div>
                    {loading ? (
                        <div className="w-fuill h-full flex flex-col justify-center items-center overflow-hidden font-ibm-korean text-white text-md font-bold p-2">
                            <EclipseSpinner />
                            <p>{"플레이어 로딩 중"}</p>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-end">
                            <div className="w-full h-3/5 relative items-end flex">
                                <div className="absolute w-full h-full rounded-t-lg bg-black"></div>
                                <div className="w-full h-full relative flex justify-center items-center">
                                    {imageLoading || imageUrl === "" ? (
                                        <div className="w-fuill h-full flex flex-col justify-center items-center overflow-hidden font-ibm-korean text-white text-lg font-bold p-2">
                                            <EclipseSpinner />
                                            <p>{"앨범 이미지 로딩 중"}</p>
                                        </div>
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
