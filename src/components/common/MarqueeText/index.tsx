import { CSSProperties, useRef, useState } from "react";
import { useInterval } from "react-use";

/**
 * Marquee Text Object
 * Slide text to left and right when text's width overflows from parent's width
 */

interface MarqueeProps {
    children: string;
    className?: string;
    style?: CSSProperties;
    textClassName?: string;
    hover?: boolean;
    setHover?: () => void;
}

export function MarqueeText(props: MarqueeProps): JSX.Element {
    // hover checker
    // if props contains hover or setHover states refers props first
    const [hover, setHover] =
        props.hover !== undefined
            ? [
                  props.hover,
                  (v: boolean) => {
                      return !v;
                  },
              ]
            : useState(false);
    // parent size ref
    const parent = useRef<HTMLDivElement>(null);
    // text size ref
    const text = useRef<HTMLParagraphElement>(null);
    // difference between parent and text
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
            style={props.style === undefined ? {} : props.style}
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
