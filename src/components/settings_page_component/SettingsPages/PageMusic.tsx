import DisplayText from "../DisplayValues";
import { NoSettings } from "./NoSettings";
export function PageMusic(): JSX.Element {
    return (
        <div className="w-auto h-auto flex flex-col">
            <div className="w-full h-auto flex flex-col gap-y-10">
                <div className="w-full h-auto">
                    <p className="font-bold text-2xl">
                        {DisplayText.music.meta.title}
                    </p>
                </div>
                <NoSettings />
            </div>
        </div>
    );
}
