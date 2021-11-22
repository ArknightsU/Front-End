import Link from "next/link";
import { CustomImage } from "..";
import DisplayText from "./DisplayValues";

export function SettingsHeader(): JSX.Element {
    return (
        <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-700 shadow-br flex justify-start items-center pl-5 pr-8">
            <div className="w-24 h-full">
                <CustomImage src="/ui/wolu.webp" />
            </div>
            <p className="font-bold text-lg md:text-2xl">{DisplayText.title}</p>
            <Link href="/" passHref>
                <div className="w-40 h-10 ml-auto bg-blue-500 rounded-lg flex flex-row transition-all duration-500 justify-center items-center hover:bg-blue-700 border-0 active:border-2 border-amber-300 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="font-bold text-base md:text-lg ">
                        {DisplayText.prev}
                    </p>
                </div>
            </Link>
        </div>
    );
}
