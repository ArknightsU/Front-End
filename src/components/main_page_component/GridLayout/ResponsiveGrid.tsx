import React, { useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";
import { useWindowSize } from "../../useWindowSize";

interface Props {
    children?: React.ReactNode;
}

export function ResponsiveGrid({ children }: Props): JSX.Element {
    const size = useWindowSize();
    const height = size.height;
    const width = size.width;
    const rowHeight = width > 1024 ? (height - 40) / 10 : (height - 40) / 5;
    const breakpoints = {
        xxl: 1536,
        xl: 1280,
        lg: 1024,
        md: 768,
        sm: 640,
        xs: 0,
    };
    const cols = { xxl: 20, xl: 20, lg: 20, md: 10, sm: 10, xs: 10 };

    const bigLayout = [
        // eslint-disable-next-line prettier/prettier
        { i: "operator", x: 9, y: 0, w: 5, h: 5, static: true, isDraggable: true },
        // eslint-disable-next-line prettier/prettier
        { i: "gacha", x: 10, y: 5, w: 8, h: 3, static: true, isDraggable: true },
        { i: "calc", x: 2, y: 2, w: 7, h: 4, static: true, isDraggable: true },
        { i: "music", x: 5, y: 6, w: 5, h: 4, static: true, isDraggable: true },
        // eslint-disable-next-line prettier/prettier
        { i: "login", x: 14, y: 1, w: 3, h: 2, static: true, isDraggable: true },
        // eslint-disable-next-line prettier/prettier
        { i: "settings", x: 10, y: 8, w: 3, h: 2, static: true, isDraggable: true },
        { i: "dev", x: 2, y: 0, w: 3, h: 2, static: true, isDraggable: true },
        // eslint-disable-next-line prettier/prettier
        { i: "theme", x: 15, y: 8, w: 3, h: 2, static: true, isDraggable: true },
        { i: "logo", x: 9, y: 5, w: 1, h: 1, static: true, isDraggable: true },
    ];
    const smallLayout = [
        // eslint-disable-next-line prettier/prettier
        { i: "operator", x: 0, y: 6, w: 6, h: 2, static: true },
        { i: "gacha", x: 0, y: 4, w: 6, h: 2, static: true },
        { i: "calc", x: 0, y: 2, w: 6, h: 2, static: true },
        { i: "music", x: 0, y: 0, w: 6, h: 2, static: true },
        { i: "login", x: 6, y: 0, w: 3, h: 2, static: true },
        // eslint-disable-next-line prettier/prettier
        { i: "settings", x: 6, y: 2, w: 3, h: 1, static: true },
        { i: "dev", x: 6, y: 6, w: 3, h: 1, static: true },
        { i: "theme", x: 6, y: 3, w: 3, h: 1, static: true },
        { i: "logo", x: 6, y: 7, w: 3, h: 1, static: true },
    ];
    const menuLayout = {
        xxl: bigLayout,
        xl: bigLayout,
        lg: bigLayout,
        md: smallLayout,
        sm: smallLayout,
        xs: smallLayout,
    };
    const [startItem, setStartItem] = useState({});
    return (
        <ResponsiveGridLayout
            breakpoints={breakpoints}
            cols={cols}
            width={size.width}
            rowHeight={rowHeight}
            layouts={menuLayout}
            margin={[0, 0]}
            containerPadding={[0, 0]}
            onDragStart={(layout, oldItem) => {
                setStartItem(oldItem);
            }}
            onDrag={(layout, oldItem, newItem, placeholder, event) => {
                if (
                    placeholder.x + placeholder.w > 20 ||
                    placeholder.y + placeholder.h > 10
                ) {
                    event.stopPropagation();
                    event.preventDefault();
                    layout[layout.indexOf(newItem)] = oldItem;
                }
            }}
            onDragStop={(layout, oldItem, newItem) => {
                if (newItem.x + newItem.w > 20 || newItem.y + newItem.h > 10) {
                    // if drag started, startItem state always have x, y, w, h
                    // Ignore this warning. This is TYPESCRIPT THING
                    layout[layout.indexOf(newItem)] = startItem;
                }
            }}
        >
            {children}
        </ResponsiveGridLayout>
    );
}
