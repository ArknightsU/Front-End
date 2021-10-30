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
                noskill: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='100%' x2='100%' y2='0' stroke='#000' /></svg>")`,
            },
            dropShadow: {
                bottom: "0 20px 5px rgba(0, 0, 0, 0.2)",
            },
            colors: {
                truegray: colors.trueGray,
            },
            zIndex: {
                bg: -1,
                60: 60,
                70: 70,
                80: 80,
                animation: 100,
                gachaSkip: 101,
            },
            width: {
                "1/10": "10%",
            },
            transitionDuration: {
                1500: "1500ms",
            },
            boxShadow: {
                right: "5px 0px 3px rgba(0, 0, 0, 0.2)",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
            opacity: ["disabled"],
            filter: ["disabled"],
            grayscale: ["disabled"],
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
