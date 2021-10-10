module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
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
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
