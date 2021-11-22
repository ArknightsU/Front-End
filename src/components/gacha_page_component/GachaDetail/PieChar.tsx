// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { DarkMode } from "@recoil/atoms";
import { useRecoilValue } from "recoil";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
interface PieProps {
    data: any;
    length: number;
}
export const PieChart = ({ data, length }: PieProps) => {
    const darkMode = useRecoilValue(DarkMode);
    return (
        <ResponsivePie
            data={data}
            fit={true}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ theme: "background" }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={darkMode ? "#ffffff" : "#333333"}
            arcLinkLabelsThickness={5}
            arcLinkLabelsColor={{ from: "color", modifiers: [] }}
            arcLabel={function (e) {
                return ((e.value / length) * 100).toFixed(1).toString() + "%";
            }}
            arcLabelsRadiusOffset={0.55}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={darkMode ? "white" : "black"}
            theme={{
                fontSize: 15,
                tooltip: {
                    container: { background: darkMode ? "black" : "white" },
                },
            }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: "ruby",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "c",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "go",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "python",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "scala",
                    },
                    id: "lines",
                },
                {
                    match: {
                        id: "lisp",
                    },
                    id: "lines",
                },
                {
                    match: {
                        id: "elixir",
                    },
                    id: "lines",
                },
                {
                    match: {
                        id: "javascript",
                    },
                    id: "lines",
                },
            ]}
            legends={[]}
        />
    );
};
