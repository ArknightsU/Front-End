import { CustomImage } from "..";
import DisplayText from "./DisplayValues";

export function SettingsHeader(): JSX.Element {
    return (
        <div className="w-full h-full rounded-lg bg-gray-100 shadow-br flex justify-start items-center pl-5 pr-8">
            <div className="w-24 h-full">
                <CustomImage src="/ui/wolu.webp" />
            </div>
            <p className="font-bold text-lg md:text-2xl">{DisplayText.title}</p>
            <div className="w-24 h-10 ml-auto bg-red-500 rounded-lg flex  justify-center items-center hover:bg-red-700 border-0 active:border-2 border-amber-300">
                <p className="font-bold text-base md:text-lg text-white">
                    {DisplayText.reset}
                </p>
            </div>
        </div>
    );
}
