/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMusicDB } from "@components";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { CurrentPlayList } from "@recoil/atoms";
import { useRecoilState } from "recoil";

interface PlayListItemProps {
    fav: boolean;
    music_key: string;
    playListFavorite: string[];
    playListFavoriteFunction: {
        add: (item: string) => void;
        remove: (item: string) => void;
    };
    index: number;
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
export function PlayListItem(props: PlayListItemProps): JSX.Element {
    const [value, loading] = useMusicDB(props.music_key);
    const [currentPlayList, setCurrentPlayList] =
        useRecoilState(CurrentPlayList);
    return (
        <div className="w-full h-6 md:h-10 bg-truegray-900 flex-shrink-0 rounded-lg relative overflow-visible">
            <div className="w-1/3 h-2 absolute flex justify-start items-center bg-red-700 z-10 opacity-0 md:opacity-100">
                <p className="font-ibm-mono font-bold text-xxs text-white ml-1 -top-2 -left-2 uppercase">
                    {"Song Name: "}
                </p>
            </div>
            {loading ? (
                <EclipseSpinner />
            ) : (
                <>
                    <div className="w-full h-full flex flex-row justify-start items-center">
                        <div className="w-2/3 h-full flex justify-start items-center relative">
                            <p className="w-full font-ibm-sans font-bold text-sm overflow-clip ml-2 truncate text-white">
                                {
                                    // @ts-ignore
                                    value.name
                                }
                            </p>
                        </div>
                        <div
                            className={`w-1/3 h-full p-2 flex justify-end items-end transition-all duration-700 ${
                                !props.playListFavorite.includes(
                                    props.music_key,
                                )
                                    ? "text-gray-400 hover:text-yellow-300 focus:text-yellow-500"
                                    : "text-yellow-300 hover:text-gray-400"
                            }`}
                            style={{ zIndex: 12 }}
                            onClick={() => {
                                if (
                                    props.playListFavorite.includes(
                                        props.music_key,
                                    )
                                ) {
                                    props.playListFavoriteFunction.remove(
                                        props.music_key,
                                    );
                                } else {
                                    props.playListFavoriteFunction.add(
                                        props.music_key,
                                    );
                                }
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-full w-full"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div
                            className="w-2/3 h-full flex justify-center items-center absolute transition-all duration-500 opacity-0 hover:opacity-100 bg-truegray-900 rounded-lg"
                            onClick={() => {
                                setCurrentPlayList(props.fav);
                                props.setCurrent(props.index);
                            }}
                        >
                            <p className="ml-2 w-full font-ibm-sans font-bold text-sm text-center truncate text-white">
                                {"재생: " +
                                    // @ts-ignore
                                    value.name}
                            </p>
                        </div>
                        {props.current === props.index &&
                        props.fav === currentPlayList ? (
                            <div
                                className="w-2/3 left-0 h-full flex justify-center items-center absolute transition-all duration-500 bg-truegray-900 rounded-lg"
                                onClick={() => {
                                    props.setCurrent(props.index);
                                }}
                                style={{ zIndex: 11 }}
                            >
                                <p className="w-full font-ibm-sans font-bold text-sm text-center truncate text-white">
                                    {"재생 중 : " +
                                        // @ts-ignore
                                        value.name}
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
