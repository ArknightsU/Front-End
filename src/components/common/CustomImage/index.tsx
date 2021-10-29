import React from "react";
import Image from "next/image";

interface ImageProps {
    src: string;
    type?: "stretch" | "contain";
}
// custom next/image component
export function CustomImage(props: ImageProps): JSX.Element {
    // contain version
    // stretches image into parent's size
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
        // fill version
        // does not break image's origin ratio, fit its content into parent
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
