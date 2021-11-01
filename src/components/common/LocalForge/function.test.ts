import { getMusicDB } from "@components";
test("MUSIC DATA", () => {
    getMusicDB().then((data) => {
        console.log(data);
    });
});
