import React from "react";
import { menuStyle, insideStyle } from "./common";
import AudioPlayer from "react-h5-audio-player";

// TODO : MUSIC PLAYER
interface MusicProps {
    data: string;
}
export function Music(props: MusicProps): JSX.Element {
    console.log(props.data);
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>
                <AudioPlayer autoPlay src={props.data} />
            </div>
        </div>
    );
}
