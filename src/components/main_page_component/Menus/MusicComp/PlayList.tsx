import { SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";
import { PlayListItem } from "./PlayListItem";

interface PlayListProps {
    fav: boolean;
    setFav: React.Dispatch<SetStateAction<boolean>>;
    playListAll: Array<string>;
    playListFavorite: Array<string>;
    playListFavoriteFunction: {
        add: (item: string) => void;
        remove: (item: string) => void;
    };
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
    currentPlayList: boolean;
    setCurrentPlayList: SetterOrUpdater<boolean>;
}
export function PlayList(props: PlayListProps): JSX.Element {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div
                className="w-full flex flex-row items-end"
                style={{ height: "10%", minHeight: "30px" }}
            >
                <div
                    className={`w-1/2 flex justify-center items-center rounded-t-lg transition-all duration-700 ${
                        !props.fav
                            ? "h-full bg-gray-200"
                            : "h-4/5 bg-truegray-400"
                    }`}
                    onClick={() => {
                        props.setFav(false);
                    }}
                >
                    <p className="font-bold text-sm font-ibm-korean text-truegray-700">
                        {"모든 곡"}
                    </p>
                </div>
                <div
                    className={`w-1/2 flex justify-center items-center rounded-t-lg transition-all duration-700 ${
                        props.fav
                            ? "h-full bg-gray-200"
                            : "h-4/5 bg-truegray-400"
                    }`}
                    onClick={() => {
                        props.setFav(true);
                    }}
                >
                    <p className="font-bold text-sm font-ibm-korean text-truegray-700">
                        {"즐겨찾기"}
                    </p>
                </div>
            </div>
            <div className="w-full bg-gray-200 p-2" style={{ height: "90%" }}>
                <div className="w-full h-full flex flex-col justify-end items-end">
                    <div
                        className="w-full flex justify-start items-start"
                        style={{ height: "85%" }}
                    >
                        <div className="w-full h-full overflow-auto flex flex-col gap-y-1">
                            {(props.fav
                                ? props.playListFavorite
                                : props.playListAll
                            ).map((v, idx) => (
                                <PlayListItem
                                    music_key={v}
                                    key={idx}
                                    index={idx}
                                    fav={props.fav}
                                    playListFavorite={props.playListFavorite}
                                    playListFavoriteFunction={
                                        props.playListFavoriteFunction
                                    }
                                    current={props.current}
                                    setCurrent={props.setCurrent}
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className="w-full flex justify-center items-center p-1"
                        style={{ height: "15%" }}
                    >
                        <div
                            className="w-full h-full bg-blue-500 hover:bg-blue-600 transition-all duration-500 flex justify-center items-center rounded-lg"
                            onClick={() => {
                                props.setCurrentPlayList(props.fav);
                                props.setCurrent(0);
                            }}
                        >
                            <p className="font-ibm-korean font-bold whitespace-nowrap text-white">
                                {"현재 재생목록을 재생"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
