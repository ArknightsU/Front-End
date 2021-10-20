import React from "react";
import { Container } from "@components/Container";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { gzDecompress } from "@components/common";
import { DBInit } from "@components/common/CharDB";
import { useSessionStorage } from "react-use";


const Gacha: React.FC = (props) => {
    console.log(props.data);
    return (
        <Container>
            <Link href="/">
                <div> hello </div>
            </Link>
        </Container>
    );
};

const json_gz_url = "https://arknightsu.github.io/json/character_table.json.gz";
const json_url = "https://arknightsu.github.io/json/character_table.json";
export const getServerSideProps: GetServerSideProps = async (context) => {
    const char = await gzDecompress(json_gz_url, json_url);
    return { props: { data: char } };
};

export default Gacha;
