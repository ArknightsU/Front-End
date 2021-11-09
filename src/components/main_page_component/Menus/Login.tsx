import { useGid } from "@recoil/hooks";
import React from "react";
import { menuStyle, insideStyle } from "./common";
import { SubMenuComp } from "./SubMenuComp";
import { useLoginPopUp } from "@recoil/hooks";
import { UnderConstruct } from "@components/common/UnderConstruct";
import { useSetRecoilState } from "recoil";
import { RecoilError } from "@recoil/atoms";

export function Login(): JSX.Element {
    const [gid, { setGid }] = useGid();
    React.useEffect(() => {
        setGid("abcdefg");
    });
    const [login, { toggleLoginPopUp }] = useLoginPopUp();
    const icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-8 lg:w-8"
            viewBox="0 0 20 20"
            fill="#fff"
        >
            <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
            />
        </svg>
    );
    const setError = useSetRecoilState(RecoilError);
    return (
        <div className={menuStyle} onClick={toggleLoginPopUp}>
            <div className={insideStyle}>
                <div className="w-full h-full absolute p-4 md:p-4">
                    <div className="w-full h-full relative">
                        <UnderConstruct
                            onClick={() => {
                                setError(true);
                            }}
                        />
                    </div>
                </div>
                <SubMenuComp
                    text={"로그인"}
                    background="bg-gray-500"
                    icon={icon}
                />
            </div>
        </div>
    );
}
