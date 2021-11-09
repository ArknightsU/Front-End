import React, { useEffect, useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";
import { useWindowSize } from "@components/hooks/useWindowSize";

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
        { i: "operator", x: 9, y: 0, w: 5, h: 5 },
        { i: "gacha", x: 10, y: 6, w: 9, h: 3 },
        { i: "calc", x: 1, y: 2, w: 8, h: 4 },
        { i: "music", x: 1, y: 5, w: 9, h: 5 },
        { i: "login", x: 14, y: 1, w: 3, h: 3 },
        { i: "settings", x: 13, y: 10, w: 3, h: 2 },
        { i: "dev", x: 10, y: 10, w: 3, h: 2 },
        { i: "theme", x: 16, y: 10, w: 3, h: 2 },
        { i: "status", x: 17, y: 1, w: 2, h: 3 },
        { i: "ui", x: 5, y: 0, w: 3, h: 2 },
        { i: "db", x: 1, y: 0, w: 8, h: 1 },
        { i: "trans", x: 14, y: 4, w: 5, h: 2 },
    ];
    const smallLayout = [
        { i: "operator", x: 0, y: 6, w: 6, h: 2 },
        { i: "gacha", x: 0, y: 4, w: 6, h: 2 },
        { i: "calc", x: 0, y: 5, w: 6, h: 2 },
        { i: "music", x: 0, y: 0, w: 9, h: 2 },
        { i: "login", x: 6, y: 3, w: 3, h: 1 },
        { i: "settings", x: 6, y: 5, w: 3, h: 1 },
        { i: "dev", x: 6, y: 6, w: 3, h: 1 },
        { i: "theme", x: 6, y: 7, w: 3, h: 1 },
        { i: "status", x: 6, y: 3, w: 3, h: 1 },
        { i: "db", x: 0, y: 9, w: 9, h: 1 },
        { i: "trans", x: 6, y: 4, w: 3, h: 1 },
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
            isResizable={false}
            isBounded={true}
            isDraggable={false}
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    layout[layout.indexOf(newItem)] = startItem;
                }
            }}
        >
            {children}
        </ResponsiveGridLayout>
    );
}
