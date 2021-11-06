import { SetStateAction, useEffect, useState } from "react";
import { useKey } from "react-use";

interface InputProps {
    setValue: React.Dispatch<SetStateAction<string>>;
}
export default function Input(props: InputProps): JSX.Element {
    const [query, setQuery] = useState("");
    useKey("Enter", () => {
        props.setValue(query);
    });
    useEffect(() => {
        const timeOutId = setTimeout(() => props.setValue(query), 1000);
        return () => clearTimeout(timeOutId);
    }, [query]);
    return (
        <div className="w-40">
            <input
                type="text"
                value={query}
                placeholder="Input Pool Name"
                onChange={(e) => setQuery(e.target.value)}
                className="mt-1 w-full h-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
            ></input>
        </div>
    );
}
