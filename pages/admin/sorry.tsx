import { CustomImage } from "@components";
import { NextPage } from "next";
import Link from "next/link";

const Sorry: NextPage = () => {
    return (
        <div
            className="w-screen h-screen flex flex-col justify-center items-center gap-y-8"
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="w-full h-1/2 flex justify-center items-center"
                style={{ height: "50vh", width: "100vw" }}
            >
                <CustomImage src="/icon.png" />
            </div>
            <p className="font-bold font-ibm-korean text-2xl whitespace-pre-line text-center">
                {"ARKNIGHTS ONE ADMIN PAGE\nONLY AUTHORIZED USERS CAN LOG IN"}
            </p>
            <div className="h-auto w-auto flex flex-row justify-center items-center gap-x-5">
                <Link href="/" passHref>
                    <div className="w-40 h-20 bg-red-700 text-white flex justify-center items-center text-lg text-center font-ibm-korean font-bold rounded-lg">
                        {"GET BACK TO MAIN"}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sorry;
