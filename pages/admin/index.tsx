/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage } from "@components";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
interface AdminPageProps {
    isAdmin: boolean;
}

const Admin: NextPage<AdminPageProps> = ({ isAdmin }) => {
    return (
        <>
            {!isAdmin && (
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
                        {
                            "ARKNIGHTS ONE ADMIN PAGE\nONLY AUTHORIZED USERS CAN LOG IN"
                        }
                    </p>
                    <div className="h-auto w-auto flex flex-row justify-center items-center gap-x-5">
                        <Link href="/" passHref>
                            <div className="w-40 h-20 bg-red-700 text-white flex justify-center items-center text-lg text-center font-ibm-korean font-bold rounded-lg">
                                {"GET BACK TO MAIN"}
                            </div>
                        </Link>
                    </div>
                </div>
            )}
            {isAdmin && (
                <div
                    className="w-full h-full flex flex-col justify-center items-center gap-y-8"
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
                        {"ARKNIGHTS ONE ADMIN PAGE"}
                    </p>
                    <div className="h-auto w-auto flex flex-row justify-center items-center gap-x-5">
                        <Link href="/" passHref>
                            <div className=" w-40 h-20 flex justify-center items-center font-bold font-ibm-korean bg-red-700 text-2xl text-white rounded-lg">
                                {"Go Main"}
                            </div>
                        </Link>
                        <Link href={"/admin/pools"} passHref>
                            <div className=" w-40 h-20 flex justify-center items-center font-bold font-ibm-korea bg-green-700 text-2xl text-white rounded-lg">
                                {"POOL CONFIG"}
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const user = session?.user;
    if (user === null || user === undefined)
        return {
            redirect: {
                destination: "/admin/sorry",
                permanent: false,
            },
        };
    if (user.email === process.env.NEXTAUTH_ADMIN_ADDRESS) {
        return { props: { isAdmin: true } };
    }
    return {
        redirect: {
            destination: "/admin/sorry",
            permanent: false,
        },
    };
}

export default Admin;
