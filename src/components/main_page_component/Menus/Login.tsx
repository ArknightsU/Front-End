import { useGid } from "@recoil/hooks";
import React from "react";
import { menuStyle, insideStyle } from "./common";
import { SubMenuComp } from "./SubMenuComp";
import { useLoginPopUp } from "@recoil/hooks";
import { UnderConstruct } from "@components/common/UnderConstruct";
import { useSetRecoilState } from "recoil";
import { RecoilError } from "@recoil/atoms";
import { signIn, signOut, useSession } from "next-auth/react";
import { CustomImage } from "@components";

export function Login(): JSX.Element {
    const [gid, { setGid }] = useGid();
    React.useEffect(() => {
        setGid("abcdefg");
    });
    const { data: session, status } = useSession();
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
    console.log(session);
    return (
        <div className={menuStyle}>
            <div className={insideStyle}>
                {/*
                <div className="w-full h-full absolute p-4 md:p-4">
                    <div className="w-full h-full relative">
                        <UnderConstruct
                            onClick={() => {
                                setError(true);
                            }}
                        />
                    </div>
                </div>
                */}
                {!session && (
                    <div
                        className="w-full h-full"
                        onClick={() => {
                            signIn("google");
                        }}
                    >
                        <SubMenuComp
                            text={"로그인"}
                            background="bg-gray-500"
                            icon={icon}
                        />
                    </div>
                )}
                {session && (
                    <div className="w-full h-full flex justify-center items-center flex-col font-bold font-ibm-korean text-base md:text-2xl gap-y-0 md:gap-y-1 text-black dark:text-white">
                        <div className="w-12 h-12 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden">
                            {session.user && session.user.image ? (
                                <CustomImage src={session.user.image} />
                            ) : (
                                <></>
                            )}
                        </div>
                        <p className=" whitespace-pre-line text-center">
                            {`${
                                session.user && session.user.name
                                    ? session.user.name
                                    : "이름없음"
                            }`}
                        </p>
                        <div
                            className="w-4/5 h-1/5 mt-0 md:mt-3 bg-red-500 rounded-lg text-white hover:bg-red-700 transition-colors duration-700 active:border-2 border-0 border-amber-500 flex justify-center items-center"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            {"로그아웃"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
