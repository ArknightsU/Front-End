import React, { useState, useEffect } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";

interface Props {
    children?: React.ReactNode;
}

export function ResponsiveGridLib({ children }: Props): JSX.Element {
    const size = useWindowSize();
    const height = size.height;
    const width = size.width;
    const rowHeight = width > 1024 ? height / 10 : height / 5;
    const breakpoints = {
        xxl: 1536,
        xl: 1280,
        lg: 1024,
        md: 768,
        sm: 640,
        xs: 0,
    };
    const cols = { xxl: 10, xl: 10, lg: 10, md: 3, sm: 3, xs: 3 };

    const bigLayout = [
        { i: "test1", x: 0, y: 0, w: 1, h: 2, static: true, isDraggable: true },
        { i: "test2", x: 3, y: 7, w: 4, h: 2, static: true, isDraggable: true },
        { i: "test3", x: 8, y: 1, w: 2, h: 2, static: true, isDraggable: true },
        { i: "test4", x: 7, y: 7, w: 1, h: 1, static: true, isDraggable: true },
    ];
    const smallLayout = [
        { i: "test1", x: 0, y: 0, w: 2, h: 2, static: true },
        { i: "test1", x: 0, y: 1, w: 3, h: 2, static: true },
        { i: "test1", x: 0, y: 2, w: 1, h: 2, static: true },
        { i: "test1", x: 0, y: 3, w: 2, h: 2, static: true },
    ];
    const menuLayout = {
        xxl: bigLayout,
        xl: bigLayout,
        lg: bigLayout,
        md: smallLayout,
        sm: smallLayout,
        xs: smallLayout,
    };
    return (
        <ResponsiveGridLayout
            breakpoints={breakpoints}
            cols={cols}
            width={size.width}
            rowHeight={rowHeight}
            layouts={menuLayout}
            margin={[0, 0]}
            containerPadding={[0, 0]}
            onDrag={(layout, oldItem, newItem, placeholder, event) => {
                if (
                    placeholder.x + placeholder.w > 10 ||
                    placeholder.y + placeholder.h > 10
                ) {
                    event.stopPropagation();
                    event.preventDefault();
                    layout[layout.indexOf(newItem)] = oldItem;
                }
            }}
            onDragStop={(layout, oldItem, newItem, placeholder) => {
                if (newItem.x + newItem.w > 10 || newItem.y + newItem.h > 10) {
                    layout[layout.indexOf(newItem)] = oldItem;
                }
            }}
        >
            {children}
        </ResponsiveGridLayout>
    );
}

// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== "undefined") {
            // Handler to call on window resize
            const handleResize = () => {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
