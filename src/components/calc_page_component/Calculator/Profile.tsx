/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage } from "@components/common";

interface ProfileProps {
    char: string;
    displayNumber: string;
    name: string;
}
export function Profile(props: ProfileProps): JSX.Element {
    return (
        <div className="h-auto w-auto relative">
            <div
                className="h-6 w-18 md:h-8 md:w-24 absolute -top-1 -left-1 bg-yellow-300 flex justify-end items-end"
                style={{ zIndex: 5 }}
            >
                <div className="h-full w-11/12 bg-black flex flex-row">
                    <div className="h-full w-1/2 flex justify-center items-center">
                        <p className="h-auto w-auto text-truegray-600 font-bold font-mono text-xxs md:text-xs leading-none align-middle text-center">
                            {"DATA\nNO./"}
                        </p>
                    </div>
                    <div className="h-full w-1/2 flex justify-center items-center">
                        <p className="h-auto w-auto text-white font-bold font-sans text-xs md:text-sm leading-none align-middle text-center">
                            {
                                // @ts-ignore
                                props.displayNumber
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-24 w-24 md:h-40 md:w-40" style={{ zIndex: 11 }}>
                <CustomImage src={`/img/avatars/${props.char}.webp`} />
            </div>
            <div className="h-auto w-24 md:h-auto md:w-40 relative">
                <p className="top-0 left-0 text-black font-bold text-xxs ml-2">
                    {"Operator Name"}
                </p>
                <hr className="h-0 border-black" />
            </div>
            <div className="h-4 w-24 md:h-6 md:w-40">
                <p className="h-auto w-auto font-sans text-md md:text-lg font-extrabold leading-none ml-2">
                    {
                        // @ts-ignore
                        props.name
                    }
                </p>
            </div>
        </div>
    );
}
