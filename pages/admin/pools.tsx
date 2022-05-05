/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage } from "@components";
import { PoolsMain } from "@components/admin_page_component/PoolsMain";
import { GetStaticProps, NextPage, NextPageContext } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
interface AdminPageProps {
    isAdmin: boolean;
}
const Pools: NextPage<AdminPageProps> = ({ isAdmin }) => {
    return (
        <PoolsMain />
        /*
        <>
            {isSessionRight() ? (
                <PoolsMain />
            ) : (
                <div
                    className="w-full h-full flex flex-col justify-center items-center font-ibm-korean text-4xl gap-y-8"
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
                    <p className="text-center font-bold">
                        {"YOU HAVE NO PERMISSION TO GET IN THIS PAGE"}
                    </p>
                    <div className="w-auto h-auto flex flex-row gap-x-5">
                        <Link href="/" passHref>
                            <div className="w-40 h-20 bg-red-700 text-white flex justify-center items-center text-lg text-center font-ibm-korean font-bold rounded-lg">
                                {"GET BACK TO MAIN"}
                            </div>
                        </Link>
                        <div
                            className="w-40 h-20 bg-green-700 text-white flex justify-center items-center text-lg text-center font-ibm-korean font-bold rounded-lg"
                            onClick={() => {
                                signIn();
                            }}
                        >
                            {"LOG IN"}
                        </div>
                    </div>
                </div>
            )}
        </>*/
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

export default Pools;
