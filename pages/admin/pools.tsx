import { CustomImage } from "@components";
import { PoolsMain } from "@components/admin_page_component/PoolsMain";
import { GetStaticProps, NextPage } from "next";
import { signIn, useSession } from "next-auth/client";
import Link from "next/link";

const Pools: NextPage<any> = () => {
    const [session, loading] = useSession();
    if (loading) {
        return <p>{"loggin in..."}</p>;
    }

    return (
        <>
            {session ? (
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
        </>
    );
};

export default Pools;
