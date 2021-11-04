import { useRef, useState } from "react";
import { useInterval } from "react-use";

interface MarqueeProps {
    children: string;
    className?: string;
    textClassName?: string;
}

export function MarqueeText(props: MarqueeProps): JSX.Element {
    const [hover, setHover] = useState(false);
    const parent = useRef<HTMLDivElement>(null);
    const text = useRef<HTMLParagraphElement>(null);
    const diff =
        parent.current === null || text.current === null
            ? 0
            : text.current.offsetWidth - parent.current.offsetWidth > 0
            ? text.current.offsetWidth - parent.current.offsetWidth
            : 0;
    const [animate, setAnimate] = useState(diff);
    useInterval(
        () => {
            if (animate === 0) {
                setAnimate(diff);
            } else {
                setAnimate(0);
            }
        },
        hover ? 2000 : null,
    );
    return (
        <div
            ref={parent}
            className={`${props.className} ${
                props.className === undefined ? "h-auto w-auto" : ""
            } overflow-hidden`}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <p
                ref={text}
                className={`${
                    props.textClassName ? props.textClassName : ""
                } h-auto w-max ${
                    hover ? "transform transition-all" : ""
                } duration-1500 whitespace-nowrap overflow-visible object-cover`}
                style={{
                    transform: hover
                        ? `translateX(-${animate}px)`
                        : "translateX(0px)",
                }}
            >
                {props.children}
            </p>
        </div>
    );
}
