import React from "react";
import { Container } from "@components/Container";
import Link from "next/link";
import { GetServerSideProps } from "next";

const Gacha: React.FC = () => {
    return (
        <Container>
            <Link href="/">
                <div> hello </div>
            </Link>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
    return { props: {} };
};
/*
export async function getServerSideProps(): Promise<
    GetServerSidePropsResult<any>
> {
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
    return { props: {} };
}*/

export default Gacha;
