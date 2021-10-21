import React from "react";
import Image from "next/image";

interface ImageProps {
    src: string;
    type?: "stretch" | "contain";
}
export function CustomImage(props: ImageProps): JSX.Element {
    if (props.type === undefined || props.type === "contain") {
        return (
            <div className="w-full h-full relative">
                <Image
                    src={props.src}
                    alt="items"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
        );
    } else {
        return (
            <div className="w-full h-full relative">
                <Image
                    src={props.src}
                    alt="items"
                    layout="fill"
                    objectFit="fill"
                />
            </div>
        );
    }
}
