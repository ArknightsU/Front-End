import React, { PropsWithChildren } from "react";
import Image from "next/image";

interface CarouselProps {
    parent: React.RefObject<HTMLElement>;
    images: Array<string>;
    currentIndex: number;
    onHoverStop?: boolean;
}

export function Carousel({
    parent,
    images,
    currentIndex,
    onHoverStop = false,
}: CarouselProps): JSX.Element {
    const size = {
        height: parent.current ? parent.current.offsetHeight : 0,
        width: parent.current ? parent.current.offsetWidth : 0,
    };
    const length = images.length;

    return (
        <div className="h-full w-full overflow-hidden flex flex-row items-start">
            <div
                className="absolute flex flex-row"
                style={{
                    width: size.width * length,
                    height: size.height,
                    top: 0,
                    left: currentIndex * size.width * -1,
                    transition: "left ease 1s",
                }}
            >
                {images.map((image, index) => (
                    <CarouselChild image={image} size={size} key={index} />
                ))}
            </div>
        </div>
    );
}

interface CarouselChildProps {
    image: string;
    size: { height: number; width: number };
    key: number;
}

function CarouselChild(props: CarouselChildProps): JSX.Element {
    return (
        <div
            className="relative flex justify-center items-center"
            style={{ width: props.size.width, height: props.size.height }}
        >
            <Image
                src={props.image}
                alt={"carousel child"}
                layout="fill"
                objectFit="contain"
            />
        </div>
    );
}
