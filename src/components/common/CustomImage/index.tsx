import React from "react";
import Image from "next/image";

interface ImageProps {
    src: string;
    type?: "stretch" | "contain";
    priority?: boolean;
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
                    placeholder="blur"
                    blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    priority={
                        props.priority === undefined ? false : props.priority
                    }
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
                    priority={
                        props.priority === undefined ? false : props.priority
                    }
                />
            </div>
        );
    }
}
