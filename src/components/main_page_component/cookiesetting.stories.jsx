import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";

const Demo = () => {
    const [value, updateCookie, deleteCookie] = useCookie("SameSite");
    const [value2, updateCookie2, deleteCookie2] = useCookie("secure");
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        updateCookie("None");
        updateCookie2(true);
        deleteCookie();
    }, []);

    const updateCookieHandler = () => {
        updateCookie(`my-awesome-cookie-${counter}`);
        setCounter((c) => c + 1);
    };

    return (
        <div>
            <p>Value: {value}</p>
            <button onClick={updateCookieHandler}>Update Cookie</button>
            <br />
            <button onClick={deleteCookie}>Delete Cookie</button>
        </div>
    );
};

export default {
    component: Demo,
    title: "Cookie Setting Test",
};

export const Primary = () => <Demo />;
