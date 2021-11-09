import { SetStateAction } from "react";
import { CustomImage } from "..";
/**
 * On Dev Overlapper
 */
interface UnderConstructProps {
    onClick: any;
}
export function UnderConstruct(props: UnderConstructProps): JSX.Element {
    return (
        <div className="w-full h-full absolute z-50">
            <div
                className="w-full h-full relative flex justify-center items-center"
                onClick={() => {
                    props.onClick();
                }}
            >
                <div className="w-full h-2/5 absolute">
                    <div className="w-full h-full relative flex justify-center items-center">
                        <div className="w-full h-full absolute bg-red-500 bg-opacity-80 backdrop-filter backdrop-blur-sm">
                            <CustomImage
                                src="/ui/underconstruct_bg.webp"
                                type="stretch"
                            />
                        </div>
                        <div className="w-full h-3/5 m-8">
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <div className="w-full h-1/5">
                                    <CustomImage src="/ui/underconstruct_text_0.webp" />
                                </div>
                                <div className="w-full h-3/5">
                                    <CustomImage src="/ui/underconstruct_icon.webp" />
                                </div>
                                <div className="w-full h-1/5">
                                    <CustomImage src="/ui/underconstruct_text_1.webp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
