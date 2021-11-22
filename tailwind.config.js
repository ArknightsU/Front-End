const colors = require("tailwindcss/colors");
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        scale: {
            0: "0",
            110: "1.1",
            130: "1.3",
            140: "1.4",
            150: "1.5",
        },
        backgroundSize: {
            "gacha-mask": "480px",
        },
        extend: {
            fontFamily: {
                "ibm-sans": ['"IBM Plex Sans"', "sans-serif"],
                "ibm-mono": ['"IBM Plex Mono"', "monospace"],
                "ibm-korean": ['"IBM Plex Sans KR"', "sans-serif"],
            },
            fontSize: {
                xxs: "0.2rem",
            },
            gridTemplateRows: {
                "20percent-7": "repeat(7, 20vh)",
                "20percent-14": "repeat(14, 20vh)",
                10: "repeat(10, 1fr)",
            },
            gridRowStart: {
                8: "8",
                9: "9",
                10: "10",
                11: "11",
                12: "12",
                13: "13",
                14: "14",
            },
            gridRowEnd: {
                8: "8",
                9: "9",
                10: "10",
                11: "11",
                12: "12",
                13: "13",
                14: "14",
            },
            backgroundImage: {
                bricks: 'url("/ui/bg_mask.webp")',
                orundum: 'url("/img/items/DIAMOND_SHD.webp")',
                originite: 'url("/img/items/DIAMOND.webp")',
                gachaAnimation:
                    'url("/ui/GachaAnimationImage/UI_GACHA_ONE_BACKGROUND_IMG.webp")',
                grid: 'url("/img/rank/bg.webp")',
            },
            dropShadow: {
                bottom: "0 20px 5px rgba(0, 0, 0, 0.2)",
            },
            colors: {
                truegray: colors.trueGray,
                amber: colors.amber,
                teal: colors.teal,
            },
            textColor: {
                amber: colors.amber,
                teal: colors.teal,
            },
            backgroundColor: {
                amber: colors.amber,
                teal: colors.teal,
            },
            zIndex: {
                bg: -1,
                60: 60,
                70: 70,
                80: 80,
                animation: 100,
                gachaSkip: 101,
                apiloading: 200,
            },
            width: {
                "1/10": "10%",
            },
            transitionDuration: {
                1500: "1500ms",
            },
            boxShadow: {
                right: "5px 0px 3px rgba(0, 0, 0, 0.2)",
                br: "5px 5px 3px rgba(0, 0, 0, 0.2)",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
            borderWidth: ["active"],
            opacity: ["disabled"],
            filter: ["disabled", "dark"],
            grayscale: ["disabled", "dark"],
            invert: ["dark"],
            gradientColorStops: ["dark"],
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
