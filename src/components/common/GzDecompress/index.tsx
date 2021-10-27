import axios from "axios";

export async function gzDecompress(url: string, failure_url?: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pako = require("pako");
    try {
        // fetch file with CORS enabled
        const res = await fetch(url, {
            mode: "cors",
        });
        // convert to arrayBuffer for further processing
        const buf = await res.arrayBuffer();
        // or get blob using `await res.blob()`
        // and convert blob to arrayBuffer using `await blob.arrayBuffer()`

        //console.log("input size: ", buf.byteLength);

        // decompress file
        const outBuf = pako.inflate(buf);
        //console.log("output size: ", outBuf.byteLength);

        // convert arrayBuffer to string
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const util = require("util");
        let str;
        try {
            str = new TextDecoder().decode(outBuf);
        } catch {
            str = util.TextDecoder().decode(outBuf);
        }
        //console.log('json string', str);

        // print json object
        return JSON.parse(str);
    } catch (err) {
        console.error("unable to decompress", err);
        if (failure_url) {
            try {
                const data = await axios.get(failure_url);
                return data.data;
            } catch (e) {
                console.log("json error");
                return undefined;
            }
        }
    }
}
