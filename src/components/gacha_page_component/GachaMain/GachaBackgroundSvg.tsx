import React, { useEffect, useRef } from "react";

interface GachaBackgroundSvgProps {
    parent?: React.RefObject<HTMLDivElement>;
}
export function GachaBackgroundSvg(
    props: GachaBackgroundSvgProps,
): JSX.Element {
    const container = useRef<SVGSVGElement>(null);
    const svgns = "http://www.w3.org/2000/svg";
    const parent: { width: number; height: number } = props.parent
        ? {
              width: props.parent.current?.offsetWidth,
              height: props.parent.current?.offsetHeight,
          }
        : { width: 0, height: 0 };
    const setRadius = (x: number, y: number): string => {
        const calc =
            (parent.width / 5 - (x * 2) / 5 + (parent.height / 2 - y / 2)) /
            100;
        if (calc < 0) {
            return "0";
        }
        return String(calc);
    };
    useEffect(() => {
        for (let x = 0; x < parent.width; x += parent.width / 50) {
            for (let y = 0; y < parent.height; y += parent.height / 16) {
                const circle = document.createElementNS(svgns, "circle");
                circle.setAttributeNS(
                    null,
                    "cx",
                    String(x + parent.width / 100),
                );
                circle.setAttributeNS(
                    null,
                    "cy",
                    String(y + parent.height / 32),
                );
                circle.setAttributeNS(null, "r", setRadius(x, y));
                circle.setAttributeNS(null, "style", "fill: #a5a5a5");
                container.current?.appendChild(circle);
            }
        }
    });
    return (
        <svg
            height={parent.height}
            width={parent.width}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            ref={container}
        >
            <circle cx="0" cy="0" r="0" fill="#a5a5a5" />
        </svg>
    );
}
